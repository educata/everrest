import { Module } from '@nestjs/common';
import { EncryptionService, ExceptionService } from 'src/shared';
import { AuthController, AuthService } from './auth';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN}` },
    }),
  ],
  providers: [ExceptionService, EncryptionService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
