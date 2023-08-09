import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from 'src/schemas';
import { CreateProductDto, UpdateProductDto } from '../dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addProduct(product: CreateProductDto): Promise<Product> {
    return this.productModel.create({
      ...product,
    });
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async updateProduct(id: string, body: UpdateProductDto) {
    const exists = await this.productModel.exists({ _id: id });
    if (!exists) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await this.productModel.updateOne({ _id: id }, body);
    return this.productModel.findById(id);
  }
}
