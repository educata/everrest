import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Quote, QuoteSchema, User, UserSchema } from 'src/schemas';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { ExceptionService, MongooseValidatorService } from 'src/shared';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Quote.name, schema: QuoteSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '1'}h` },
    }),
  ],
  providers: [QuoteService, ExceptionService, MongooseValidatorService],
  controllers: [QuoteController],
})
export class QuoteModule {}
