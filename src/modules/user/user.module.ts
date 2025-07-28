import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  EncryptionService,
  ExceptionService,
  MongooseValidatorService,
} from 'src/shared';
import { AuthController, AuthService } from './auth';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Cart, CartSchema } from 'src/schemas';
import {
  JwtStrategy,
  LocalStrategy,
  RefreshJwtStrategy,
} from './auth/strategies';
import { RefreshJwtGuard } from './auth/guards';
import { MailModule } from '../mail';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
    MailModule,
  ],
  providers: [
    RefreshJwtGuard,
    ExceptionService,
    EncryptionService,
    MongooseValidatorService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
})
export class UserModule {}
