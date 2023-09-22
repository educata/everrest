import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './http-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

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

  const packageJSON = fs.readFileSync('./package.json', 'utf-8');

  // ! TODO: update setContact second value when educata.dev is finished

  const config = new DocumentBuilder()
    .setTitle('EverREST')
    .setDescription('EverREST API description')
    .setVersion(JSON.parse(packageJSON).version || '0.0.0')
    .setLicense('MIT', 'https://github.com/educata/everrest/blob/main/LICENSE')
    .setContact('educata team', '', 'contact@educata.dev')
    .setExternalDoc('Documentation', 'https://everrest.educata.dev')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
