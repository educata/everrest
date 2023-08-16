import { Module } from '@nestjs/common';
import { ExceptionService } from 'src/shared';
import { AuthController, AuthService } from './auth';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ExceptionService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
