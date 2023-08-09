import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './modules';
import { ExceptionService } from './shared';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionService],
})
export class AppModule {}
