import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule, UserModule, MailModule, QrCodeModule } from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ExceptionService, EncryptionService } from './shared';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ShopModule,
    UserModule,
    MailModule,
    QrCodeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionService, EncryptionService],
})
export class AppModule {}
