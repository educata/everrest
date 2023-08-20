import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Product, ProductSchema } from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { ProductsController, ProductsService } from './product';
import { CartsController, CartsService } from './cart';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      // TODO: implement way to register once
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
  ],
  providers: [ExceptionService, ProductsService, CartsService],
  controllers: [ProductsController, CartsController],
})
export class ShopModule {}
