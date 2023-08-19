import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, SortOrder } from 'mongoose';

import {
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
  PaginationProductQueryDto,
} from '../dtos';
import { Product, ProductDocument } from 'src/schemas';
import { ExceptionService } from 'src/shared';
import {
  ExceptionStatusKeys,
  GlobalExceptionKeys,
  SortDirection,
  SortProductsBy,
} from 'src/enums';
import { ProductCategory } from 'src/interfaces';
import { API_CONFIG } from 'src/consts';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private exceptionService: ExceptionService,
  ) {}

  addProduct(product: CreateProductDto): Promise<Product> {
    return this.productModel.create({
      ...product,
      rating: 0,
      ratings: [],
    });
  }

  async getProductById(id: string): Promise<Product> {
    // TODO: Implement pipe or way to check id | we have to use mongoose.isValidObjectId
    if (!mongoose.isValidObjectId(id)) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'id must provided from product',
        GlobalExceptionKeys.IncorrectMongooseID,
      );
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      this.exceptionService.throwError(ExceptionStatusKeys.NotFound);
    }
    return product;
  }

  // TODO: Implement middleware or way to check id | we have to use mongoose.isValidObjectId
  async updateProduct(id: string, body: UpdateProductDto): Promise<Product> {
    if (!mongoose.isValidObjectId(id)) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'id must provided from product',
        GlobalExceptionKeys.IncorrectMongooseID,
      );
    }
    const product = await this.productModel.findOneAndUpdate({ _id: id }, body);
    if (!product) {
      this.exceptionService.throwError(ExceptionStatusKeys.NotFound);
    }
    return product;
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

  async getAllProductsDetailed(query: PaginationProductQueryDto) {
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
      queryObject.title = { $regex: query.keywords, $options: 'i' };
    }
    if (query.category_id) {
      queryObject['category.id'] = query.category_id;
    }
    if (query.price_min) {
      queryObject['price.current'] = { $gt: query.price_min };
    }
    if (query.price_max) {
      queryObject['price.current'] = {
        ...queryObject['price.current'],
        $lt: query.price_max,
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

  async getByCategoryId(categoryId: string, query: PaginationProductQueryDto) {
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

  async getBrandProducts(brandName: string, query: PaginationProductQueryDto) {
    const { currentPage, responsePerPage, skip } =
      this.getPaginationData(query);
    const products = await this.productModel
      .find({ brand: brandName })
      .sort({ 'price.current': 1 })
      .limit(responsePerPage)
      .skip(skip);
    const productsCount = await this.productModel.countDocuments({
      brand: brandName,
    });
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
