import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // TODO: redirect to educata website or handle in other way
    return 'Welcome to Educata backend';
  }
}
