import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product, ProductDocument } from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { ExceptionKeys } from 'src/enums';
import { ProductCategory } from 'src/interfaces';
import { API_CONFIGS } from 'src/consts';

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

  // TODO: Implement middleware or way to check id | we have to use mongoose.isValidObjectId
  async getProductById(id: string): Promise<Product> {
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
    if (isNaN(currentPage)) {
      this.exceptionService.throwError(ExceptionKeys.BadRequest);
    }
    const responsePerPage = API_CONFIGS.RESPONSE_PER_PAGE;
    const skip = responsePerPage * (Math.floor(currentPage) - 1);
    const limitedProducts = await this.productModel
      .find({})
      .limit(responsePerPage)
      .skip(skip);
    const allProducts = await this.getAllProduct();
    return {
      total: allProducts.length,
      limit: responsePerPage,
      page: currentPage,
      skip,
      products: limitedProducts,
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
}
