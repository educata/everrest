import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import {
  CreateProductDto,
  SearchProductsQueryDto,
  UpdateProductDto,
  AllProductsQueryDto,
} from '../dtos';
import { Product, ProductDocument } from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { ExceptionStatusKeys, GlobalExceptionKeys } from 'src/enums';
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

  async getAllProductsDetailed(query: AllProductsQueryDto) {
    const currentPage = query.page_index || API_CONFIG.MINIMUM_PAGE_INDEX;
    const responsePerPage = query.page_size || API_CONFIG.RESPONSE_PER_PAGE;
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
    // TODO: implement later
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
        ExceptionStatusKeys.BadRequest,
        param <= 0
          ? `${key} should be greater than 0`
          : `${key} should be number`,
      );
    }
  }
}
