import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { QuoteDto, AllQuoteDto, UpdateQuoteDto } from './dtos';

@ApiTags('quote')
@Controller('quote')
export class QuoteController {
  constructor(
    private quoteService: QuoteService,
    private readonly mongooseValidator: MongooseValidatorService,
  ) {}

  @Get()
  getAllQuote(@Query() query: AllQuoteDto) {
    return this.quoteService.getAllQuote(query);
  }

  @Get('random')
  getRandomQuote() {
    return this.quoteService.getRandomQuote();
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
  updateQuote(@Param('id') id: string, @Body() body: UpdateQuoteDto) {
    this.mongooseValidator.isValidObjectId(id);
    return this.quoteService.updateQuoteById(id, body);
  }

  @Delete('id/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Admin)
  deleteQuote(@Param('id') id: string) {
    this.mongooseValidator.isValidObjectId(id);
    return this.quoteService.deleteQuoteById(id);
  }
}
