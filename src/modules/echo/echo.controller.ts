import { Body, Controller, Post, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EchoService } from './echo.service';

@ApiTags('echo')
@Controller('echo')
export class EchoController {
  constructor(private echoService: EchoService) {}

  @Post('json')
  getJson(@Body() body: any) {
    return body;
  }

  @Post('html')
  @Render('echo')
  getHtml(@Body() body: object) {
    const text = this.echoService.jsonToHtml(body);
    return { body: text };
  }
}
