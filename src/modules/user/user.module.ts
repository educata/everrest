import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionService, ExceptionService } from 'src/shared';
import { AuthController, AuthService } from './auth';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './auth/strategies';
import { RefreshJwtGuard } from './auth/guards';
import { MailModule } from '../mail';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      // TODO: implement way to register once
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
    MailModule,
  ],
  providers: [
    ExceptionService,
    EncryptionService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtGuard,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class UserModule {}
