import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionService } from './shared';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthExpectionKeys,
  CartExpectionKeys,
  GlobalExceptionKeys,
  ProductExceptionKeys,
  ExceptionStatusKeys,
} from 'src/enums';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly exceptionService: ExceptionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('lang/errors')
  getErrors() {
    return Object.values({
      ...ExceptionStatusKeys,
      ...GlobalExceptionKeys,
      ...ProductExceptionKeys,
      ...AuthExpectionKeys,
      ...CartExpectionKeys,
    });
  }
}
