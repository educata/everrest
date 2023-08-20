import { ExceptionService } from './../../../shared/exception.service';
import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Auth } from 'src/shared';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/interfaces';
@Controller('shop/cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  getCurrentCart(
    @Auth({
      exceptionService: new ExceptionService(),
      jwtService: new JwtService(),
    })
    user: UserPayload,
  ) {
    return { ...user };
  }

  @Post('product')
  initCartWithProduct() {
    return {};
  }

  @Post('checkout')
  checkout() {
    return {};
  }

  @Patch('product')
  updateCart() {
    return {};
  }

  @Delete('product')
  deleteCartItem() {
    return {};
  }

  @Delete()
  clearCart() {
    return {};
  }
}
