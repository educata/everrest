import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './http-exceptions.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
