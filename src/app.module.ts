import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule, UserModule, MailModule } from './modules';
import { ExceptionService } from './shared';
import { EncryptionService } from './shared/encryption.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ShopModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionService, EncryptionService],
})
export class AppModule {}
