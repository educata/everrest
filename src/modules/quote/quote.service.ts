import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from 'src/schemas';
import { QuoteDto } from './dtos';
import { ExceptionService } from 'src/shared';
import { ExceptionStatusKeys, QuoteExpectionKeys } from 'src/enums';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
    private exceptionService: ExceptionService,
  ) {}

  async addQuote(quoteDto: QuoteDto) {
    const oldQuote = await this.quoteModel.findOne({ quote: quoteDto.quote });

    if (oldQuote) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'Quote already exists',
        QuoteExpectionKeys.DuplicatedQuote,
      );
    }

    return this.quoteModel.create(quoteDto);
  }

  async getRandomQuote() {
    const allQuote = await this.quoteModel.find({});
    const randomIndex = Math.floor(Math.random() * allQuote.length);
    return allQuote[randomIndex];
  }
}
