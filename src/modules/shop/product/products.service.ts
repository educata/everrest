import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from 'src/schemas';
import { CreateProductDto } from '../dtos';

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
}
