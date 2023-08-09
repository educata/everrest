import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from 'src/schemas';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { ExceptionService } from 'src/shared';
import { ExceptionKeys } from 'src/enums';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private exceptionService: ExceptionService,
  ) {}

  async addProduct(product: CreateProductDto): Promise<Product> {
    return this.productModel.create({
      ...product,
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      this.exceptionService.throwError(ExceptionKeys.NotFound);
    }
    return product;
  }

  async updateProduct(id: string, body: UpdateProductDto) {
    const product = await this.productModel.findOneAndUpdate({ _id: id }, body);
    if (!product) {
      this.exceptionService.throwError(ExceptionKeys.NotFound);
    }
    return product;
  }
}
