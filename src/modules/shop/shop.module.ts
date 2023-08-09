import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Product, ProductSchema } from 'src/schemas';
import { ProductsController, ProductsService } from './product';
import { ExceptionService } from 'src/shared';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService, ExceptionService],
  controllers: [ProductsController],
})
export class ShopModule {}
