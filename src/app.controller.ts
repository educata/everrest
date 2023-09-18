import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthExpectionKeys,
  CartExpectionKeys,
  GlobalExceptionKeys,
  ProductExceptionKeys,
  ExceptionStatusKeys,
  QRCodeExpectionKeys,
} from 'src/enums';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @Redirect('/docs')
  getDocs() {
    return { url: '/docs' };
  }

  @Get('lang/errors')
  getErrors() {
    return Object.values({
      ...ExceptionStatusKeys,
      ...GlobalExceptionKeys,
      ...ProductExceptionKeys,
      ...AuthExpectionKeys,
      ...CartExpectionKeys,
      ...QRCodeExpectionKeys,
    });
  }
}
