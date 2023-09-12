import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QrCodeService } from './qrcode.service';

@ApiTags('qrcode')
@Controller('qrcode')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Get()
  generateDefaultQrCode() {
    return 'test';
  }
}
