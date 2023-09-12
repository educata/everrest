import { Module } from '@nestjs/common';
import { QrCodeController } from './qrcode.controller';
import { QrCodeService } from './qrcode.service';

@Module({
  imports: [],
  providers: [QrCodeService],
  controllers: [QrCodeController],
})
export class QrCodeModule {}
