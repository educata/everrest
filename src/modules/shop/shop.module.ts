import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  Cart,
  CartSchema,
  Product,
  ProductSchema,
  User,
  UserSchema,
} from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { ProductsController, ProductsService } from './product';
import { CartsController, CartsService } from './cart';
import { MongooseValidatorService } from 'src/shared/mongoose-validator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      // TODO: implement way to register once
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
  ],
  providers: [
    ExceptionService,
    ProductsService,
    CartsService,
    MongooseValidatorService,
  ],
  controllers: [ProductsController, CartsController],
})
export class ShopModule {}
