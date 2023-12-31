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
import { AddProductToCartDto, ProductIdDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
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
  initCartWithProduct(
    @CurrentUser() user: UserPayload,
    @Body() body: AddProductToCartDto,
  ) {
    return this.cartsService.createCartWithProduct(user, body);
  }

  @Post('checkout')
  checkout(@CurrentUser() user: UserPayload) {
    return this.cartsService.checkout(user);
  }

  @Patch('product')
  updateCart(
    @CurrentUser() user: UserPayload,
    @Body() body: AddProductToCartDto,
  ) {
    return this.cartsService.updateCart(user, body);
  }

  @Delete('product')
  deleteCartItem(@CurrentUser() user: UserPayload, @Body() body: ProductIdDto) {
    return this.cartsService.deleteCartItem(user, body);
  }

  @Delete()
  clearCart(@CurrentUser() user: UserPayload) {
    return this.cartsService.clearCart(user);
  }
}
