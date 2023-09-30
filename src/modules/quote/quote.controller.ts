import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/enums';
import {
  JwtGuard,
  MongooseValidatorService,
  Roles,
  RolesGuard,
} from 'src/shared';
import { QuoteService } from './quote.service';
import { QuoteDto } from './dtos';

@ApiTags('quote')
@Controller('quote')
export class QuoteController {
  constructor(
    private quoteService: QuoteService,
    private readonly mongooseValidator: MongooseValidatorService,
  ) {}

  @Get()
  getAllQuote() {
    // quote?q (author/keyword)
  }

  @Get('random')
  getRandomQuote() {
    // quote/random (1)
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Admin)
  addQuote(@Body() body: QuoteDto) {
    return this.quoteService.addQuote(body);
  }

  @Patch('id/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Admin)
  updateQuote() {
    //
  }

  @Delete('id/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Admin)
  deleteQuote() {
    //
  }
}
