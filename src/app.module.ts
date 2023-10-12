import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule, UserModule, MailModule, QrCodeModule } from './modules';
import { ExceptionService, EncryptionService } from './shared';
import { QuoteModule } from './modules/quote';
import { EchoModule } from './modules/echo/echo.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ShopModule,
    UserModule,
    MailModule,
    QrCodeModule,
    QuoteModule,
    EchoModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionService, EncryptionService],
})
export class AppModule {}
