import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Product, ProductSchema } from 'src/schemas';
import { ProductsController, ProductsService } from './product';
import { ExceptionService } from 'src/shared';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      // TODO: implement way to register once
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
  ],
  providers: [ProductsService, ExceptionService],
  controllers: [ProductsController],
})
export class ShopModule {}
