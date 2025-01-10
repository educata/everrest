import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';

import {
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
  UpdateProductRatingDto,
} from '../dtos';
import { Product, ProductDocument } from 'src/schemas';
import { ExceptionService, PaginationQueryDto } from 'src/shared';
import {
  ExceptionStatusKeys,
  ProductExceptionKeys,
  SortDirection,
  SortProductsBy,
} from 'src/enums';
import { ProductCategory, ProductRating, UserPayload } from 'src/interfaces';
import { API_CONFIG } from 'src/consts';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private exceptionService: ExceptionService,
  ) {}

  async addProduct(product: CreateProductDto): Promise<Product> {
    const sameProduct = await this.productModel.findOne({
      title: product.title,
    });

    if (sameProduct) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'Product already exists with this name',
        ProductExceptionKeys.ProductAlreadyExists,
      );
    }

    if (product.brand) {
      product.brand = product.brand.toLocaleLowerCase();
    }

    return this.productModel.create({
      ...product,
      rating: 0,
      ratings: [],
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).select('+ratings');
    if (!product) {
      this.exceptionService.throwError(ExceptionStatusKeys.NotFound);
    }
    return product;
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<Product> {
    if (body.brand) {
      body.brand = body.brand.toLowerCase();
    }

    const product = await this.productModel.findOneAndUpdate({ _id: id }, body);
    if (!product) {
      this.exceptionService.throwError(ExceptionStatusKeys.NotFound);
    }
    return product;
  }

  async updateProductRating(dto: UpdateProductRatingDto, user: UserPayload) {
    const product = await this.productModel
      .findById(dto.productId)
      .populate('ratings');

    if (!product) {
      this.exceptionService.throwError(ExceptionStatusKeys.NotFound);
    }

    const updatedProductRatings = [...product.ratings] as ProductRating[];

    const existingRatingIndex = updatedProductRatings.findIndex(
      (rating) => rating.userId === user._id,
    );

    // If the user has rated this product before
    if (existingRatingIndex >= 0) {
      updatedProductRatings[existingRatingIndex] = {
        createdAt: new Date().toISOString(),
        userId: user._id,
        value: dto.rate,
      };
    } else {
      updatedProductRatings.push({
        userId: user._id,
        value: dto.rate,
        createdAt: new Date().toISOString(),
      });
    }

    const calculatedRating = (
      updatedProductRatings.reduce((prev, cur) => prev + cur.value, 0) /
      updatedProductRatings.length
    ).toFixed(3);

    const newProduct = await this.productModel.findOneAndUpdate(
      {
        _id: dto.productId,
      },
      {
        rating: calculatedRating,
        ratings: updatedProductRatings,
      },
    );

    return this.getProductById(newProduct.id);
  }

  getAllProduct(): Promise<Product[]> {
    return this.productModel.find({});
  }

  getPaginationData(query: { page_index: number; page_size: number }) {
    const currentPage = query.page_index || API_CONFIG.MINIMUM_PAGE_INDEX;
    const responsePerPage = query.page_size || API_CONFIG.RESPONSE_PER_PAGE;
    const skip = responsePerPage * (Math.floor(currentPage) - 1);
    return { currentPage, responsePerPage, skip };
  }

  async getAllProductsDetailed(query: PaginationQueryDto) {
    const { currentPage, responsePerPage, skip } =
      this.getPaginationData(query);
    const products = await this.productModel
      .find({})
      .sort({ 'price.current': 1 })
      .limit(responsePerPage)
      .skip(skip);
    const productsCount = await this.productModel.countDocuments({});
    return {
      total: productsCount,
      limit: responsePerPage,
      page: currentPage,
      skip,
      products,
    };
  }

  async searchProduct(query: SearchProductsQueryDto) {
    const { currentPage, responsePerPage, skip } =
      this.getPaginationData(query);
    const queryObject: {
      'price.current'?: object;
      'category.id'?: string;
      title?: object;
      brand?: string;
      rating?: object;
    } = {};

    const sortObject: {
      'price.current'?: SortOrder;
      title?: SortOrder;
      rating?: SortOrder;
      issueDate?: SortOrder;
    } = {};

    if (query.keywords) {
      const keywordsArray = query.keywords.split(' ');
      const regexPattern = keywordsArray
        .map((keyword) => `(?=.*${keyword})`)
        .join('');
      queryObject.title = { $regex: regexPattern, $options: 'i' };
    }
    if (query.category_id) {
      queryObject['category.id'] = query.category_id;
    }
    if (query.price_min) {
      queryObject['price.current'] = { $gte: query.price_min };
    }
    if (query.price_max) {
      queryObject['price.current'] = {
        ...queryObject['price.current'],
        $lte: query.price_max,
      };
    }
    if (query.brand) {
      queryObject.brand = query.brand;
    }
    if (query.rating) {
      queryObject.rating = { $gt: query.rating };
    }
    if (query.sort_by && query.sort_direction) {
      const sortDirection: SortOrder =
        query.sort_direction === SortDirection.Ascending ? 1 : -1;
      if (query.sort_by === SortProductsBy.Title) {
        sortObject.title = sortDirection;
      } else if (query.sort_by === SortProductsBy.Rating) {
        sortObject.rating = sortDirection;
      } else if (query.sort_by === SortProductsBy.Price) {
        sortObject['price.current'] = sortDirection;
      } else if (query.sort_by === SortProductsBy.IssueDate) {
        sortObject.issueDate = sortDirection;
      } else {
        sortObject['price.current'] = 1;
      }
    } else {
      sortObject['price.current'] = 1;
    }
    const productsCount = await this.productModel.countDocuments({
      ...queryObject,
    });
    const products = await this.productModel
      .find({ ...queryObject })
      .sort({ ...sortObject })
      .limit(responsePerPage)
      .skip(skip);
    return {
      total: productsCount,
      limit: responsePerPage,
      page: currentPage,
      sortedBy: Object.keys(sortObject)[0],
      sortedDirection: query.sort_direction ?? 'asc',
      skip,
      products,
    };
  }

  async getCategories(): Promise<ProductCategory[]> {
    const products = await this.getAllProduct();
    const category: ProductCategory[] = [];
    products.forEach((product) => {
      if (
        !category.find(
          (item) => item.name === product.category.name.toLowerCase(),
        )
      ) {
        category.push(product.category);
      }
    });
    return category;
  }

  async getByCategoryId(categoryId: string, query: PaginationQueryDto) {
    const { currentPage, responsePerPage, skip } =
      this.getPaginationData(query);
    const products = await this.productModel
      .find({ 'category.id': categoryId })
      .sort({ 'price.current': 1 })
      .limit(responsePerPage)
      .skip(skip);
    const productsCount = await this.productModel.countDocuments({
      'category.id': categoryId,
    });
    return {
      total: productsCount,
      limit: responsePerPage,
      page: currentPage,
      skip,
      products,
    };
  }

  async getBrands(): Promise<string[]> {
    const products = await this.getAllProduct();
    const brands = [];
    products.forEach((product) => {
      if (!brands.includes(product.brand.toLowerCase())) {
        brands.push(product.brand.toLowerCase());
      }
    });
    return brands;
  }

  async getBrandProducts(brandName: string, query: PaginationQueryDto) {
    const { currentPage, responsePerPage, skip } =
      this.getPaginationData(query);
    const products = await this.productModel
      .find({ brand: brandName.toLocaleLowerCase() })
      .sort({ 'price.current': 1 })
      .limit(responsePerPage)
      .skip(skip);
    const productsCount = await this.productModel.countDocuments({
      brand: brandName,
    });

    if (productsCount === 0) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        'No products found with this brand',
        ProductExceptionKeys.ProductNotFound,
      );
    }

    return {
      total: productsCount,
      limit: responsePerPage,
      page: currentPage,
      skip,
      products,
    };
  }

  deleteAllProduct() {
    return this.productModel.deleteMany({});
  }
}
