import { Body, Controller, Post, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EchoService } from './echo.service';

export class EchoDto {
  [key: string]: string;
}

@ApiTags('echo')
@Controller('echo')
export class EchoController {
  constructor(private echoService: EchoService) {}

  @Post('json')
  getJson(@Body() body: EchoDto) {
    return body;
  }

  @Post('html')
  @Render('echo')
  getHtml(@Body() body: EchoDto) {
    const text = this.echoService.jsonToHtml(body);
    return { body: text };
  }
}
