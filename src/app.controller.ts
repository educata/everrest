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
  @Redirect('https://everrest.educata.dev')
  getDocs() {
    return { url: 'https://everrest.educata.dev' };
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
