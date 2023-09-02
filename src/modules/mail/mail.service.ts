import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Mail } from 'src/interfaces';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(mail: Mail) {
    const { email, subject, template, context } = mail;
    await this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context,
    });
  }
}
