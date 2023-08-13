import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

import {
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
} from '../dtos';
import { Product, ProductDocument } from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { ExceptionKeys } from 'src/enums';
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
    });
  }

  async getProductById(id: string): Promise<Product> {
    // TODO: Implement pipe or way to check id | we have to use mongoose.isValidObjectId
    if (!mongoose.isValidObjectId(id)) {
      this.exceptionService.throwError(
        ExceptionKeys.BadRequest,
        'id must provided from product',
      );
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      this.exceptionService.throwError(ExceptionKeys.NotFound);
    }
    return product;
  }

  // TODO: Implement middleware or way to check id | we have to use mongoose.isValidObjectId
  async updateProduct(id: string, body: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate({ _id: id }, body);
    if (!product) {
      this.exceptionService.throwError(ExceptionKeys.NotFound);
    }
    return product;
  }

  getAllProduct(): Promise<Product[]> {
    return this.productModel.find({});
  }

  async getAllProductsDetailed(page = 1) {
    const currentPage = Number(page);
    this.checkQueryNumberParam(currentPage, 'page');
    const responsePerPage = API_CONFIG.RESPONSE_PER_PAGE;
    const skip = responsePerPage * (Math.floor(currentPage) - 1);
    const products = await this.productModel
      .find({})
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
    // const category = query.category ?? '';
    // if (category) {
    //   const categories = await this.getCategories();
    //   if (!categories.find((item) => item.name === category)) {
    //     this.exceptionService.throwError(
    //       ExceptionKeys.NotFound,
    //       'Category not found',
    //     );
    //   }
    // }
    // const brand = query.brand ?? '';
    // if (brand) {
    //   const brands = await this.getBrands();
    //   if (!brands.includes(brand as string)) {
    //     this.exceptionService.throwError(
    //       ExceptionKeys.NotFound,
    //       'Brand not found',
    //     );
    //   }
    // }
    // const rating = Number(query.rating ?? API_CONFIG.MINIMUM_RATE);
    // this.checkQueryNumberParam(rating, 'rate');
    // const priceMin = Number(query.price_min ?? API_CONFIG.MINIMUM_PRICE);
    // this.checkQueryNumberParam(priceMin, 'price_min');
    // const priceMax = Number(query.price_max ?? API_CONFIG.MAXIMUM_PRICE);
    // this.checkQueryNumberParam(priceMax, 'price_max');
    // if (priceMin > priceMax) {
    //   this.exceptionService.throwError(
    //     ExceptionKeys.BadRequest,
    //     "price_min can't be greater than price_max",
    //   );
    // }
    // const products = await this.getAllProduct();
    // const filteredProducts = products
    //   .filter(
    //     (product) =>
    //       product.rating >= rating &&
    //       product.price.current >= priceMin &&
    //       product.price.current <= priceMax &&
    //       (product.category.name === category || category === '') &&
    //       (product.brand === brand || brand === ''),
    //   )
    //   .sort((a, b) => a.price.current - b.price.current);
    // // TODO: should we implement query for sort by price/rate with ascending/descending order ?
    // return {
    //   total: filteredProducts.length,
    //   products: filteredProducts,
    // };
    console.log(query);
    return [];
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

  async getByCategoryId(categoryId: string): Promise<Product[]> {
    const products = await this.productModel.find({
      'category.id': categoryId,
    });
    return products;
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

  async getBrandProducts(brandName: string): Promise<Product[]> {
    const products = await this.getAllProduct();
    const brands = products.filter(
      (product) => product.brand.toLowerCase() === brandName.toLowerCase(),
    );
    return brands;
  }

  deleteAllProduct() {
    return this.productModel.deleteMany({});
  }

  private checkQueryNumberParam(param: number, key: string) {
    if (isNaN(param) || param <= 0) {
      this.exceptionService.throwError(
        ExceptionKeys.BadRequest,
        param <= 0
          ? `${key} should be greater than 0`
          : `${key} should be number`,
      );
    }
  }
}
