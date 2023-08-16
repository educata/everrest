import { Module } from '@nestjs/common';
import { ExceptionService } from 'src/shared';
import { AuthController, AuthService } from './auth';

@Module({
  imports: [],
  providers: [ExceptionService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
