import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        service: process.env.TRANSPORT_SERVICE,
        host: process.env.TRANSPORT_HOST,
        port: Number(process.env.TRANSPORT_PORT),
        secure: true,
        auth: {
          user: process.env.TRANSPORT_USER,
          pass: process.env.TRANSPORT_PASS,
        },
      },
      defaults: {
        from: `"Everrest" <${process.env.TRANSPORT_EMAIL}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
