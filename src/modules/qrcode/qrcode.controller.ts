import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QrCodeService } from './qrcode.service';
import { GenerateQrCodeDto } from './dtos';

@ApiTags('qrcode')
@Controller('qrcode')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Get()
  generateDefaultQrCode() {
    return this.qrCodeService.generateQRCodeWithImage(
      'https://everrest.educata.dev',
      this.qrCodeService.basePath,
    );
  }

  @Post('generate')
  generateWithText(@Body() body: GenerateQrCodeDto) {
    return this.qrCodeService.generateQrCode(body.text);
  }
}
