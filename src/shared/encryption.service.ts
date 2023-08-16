import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  hash(data: string) {
    return bcrypt.hash(data, Number(process.env.SALT_ROUNDS));
  }

  compareHash(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
