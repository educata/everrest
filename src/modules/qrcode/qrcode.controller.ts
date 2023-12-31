import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QrCodeService } from './qrcode.service';
import { GenerateQrCodeDto, GenerateQrCodeWithImageDto } from './dtos';

@ApiTags('qrcode')
@Controller('qrcode')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Get()
  generateDefaultQrCode() {
    return this.qrCodeService.generateQRCodeWithImage(
      'https://everrest.educata.dev',
      'https://github.com/educata/everrest/blob/main/docs/public/logo.png?raw=true',
    );
  }

  @Post('generate')
  generateWithText(@Body() body: GenerateQrCodeDto) {
    return this.qrCodeService.generateQrCode(body.text);
  }

  @Post('generate_with_image')
  generateWithImage(@Body() body: GenerateQrCodeWithImageDto) {
    return this.qrCodeService.generateQRCodeWithImage(body.text, body.imageURL);
  }
}
