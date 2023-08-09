import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionService } from './shared';

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
    return this.exceptionService.statusKeys;
  }
}
