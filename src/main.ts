import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './http-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as cp from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(cookieParser());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('EverREST')
    .setDescription('EverREST API description')
    .setVersion('0.0.9')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // TODO: Add swagger 'ApiProperty' to DTOs
  SwaggerModule.setup('docs/swagger', app, document);

  // Builds mdbook documentation in dist/docs
  cp.exec(`npm run build:doc${process.platform === 'win32' ? ':windows' : ''}`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
