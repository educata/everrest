import { Module } from '@nestjs/common';
import { QrCodeController } from './qrcode.controller';
import { QrCodeService } from './qrcode.service';
import { ExceptionService } from 'src/shared';

@Module({
  imports: [],
  providers: [QrCodeService, ExceptionService],
  controllers: [QrCodeController],
})
export class QrCodeModule {}
