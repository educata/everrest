import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CartsService } from './carts.service';
import { Auth, ExceptionService } from 'src/shared';
import { UserPayload } from 'src/interfaces';
import { CartDto } from '../dtos';
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
    return this.cartsService.getCurrentCart(user);
  }

  @Post('product')
  initCartWithProduct(
    @Auth({
      exceptionService: new ExceptionService(),
      jwtService: new JwtService(),
    })
    user: UserPayload,
    @Body() body: CartDto,
  ) {
    return this.cartsService.createCartWithProduct(user, body);
  }

  @Post('checkout')
  checkout() {
    return {};
  }

  @Patch('product')
  updateCart(
    @Auth({
      exceptionService: new ExceptionService(),
      jwtService: new JwtService(),
    })
    user: UserPayload,
    @Body() body: CartDto,
  ) {
    return this.cartsService.updateCart(user, body);
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
