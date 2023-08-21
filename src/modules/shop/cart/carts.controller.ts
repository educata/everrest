import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser, CurrentUserInterceptor, JwtGuard } from 'src/shared';
import { UserPayload } from 'src/interfaces';
import { CartDto } from '../dtos';
@Controller('shop/cart')
@UseGuards(JwtGuard)
@UseInterceptors(CurrentUserInterceptor)
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  getCurrentCart(@CurrentUser() user: UserPayload) {
    return this.cartsService.getCurrentCart(user);
  }

  @Post('product')
  initCartWithProduct(@CurrentUser() user: UserPayload, @Body() body: CartDto) {
    return this.cartsService.createCartWithProduct(user, body);
  }

  @Post('checkout')
  checkout() {
    return {};
  }

  @Patch('product')
  updateCart(@CurrentUser() user: UserPayload, @Body() body: CartDto) {
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
