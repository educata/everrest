import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from 'src/schemas';
import { AllQuoteDto, QuoteDto } from './dtos';
import { ExceptionService } from 'src/shared';
import { ExceptionStatusKeys, QuoteExpectionKeys } from 'src/enums';
import { API_CONFIG } from 'src/consts';

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

  async getAllQuote(query: AllQuoteDto) {
    const currentPage = query.page_index || API_CONFIG.MINIMUM_PAGE_INDEX;
    const responsePerPage = query.page_size || API_CONFIG.RESPONSE_PER_PAGE;
    const skip = responsePerPage * (Math.floor(currentPage) - 1);

    const queryObject: { author?: object; quote?: object } = {};

    if (query.keywords) {
      queryObject.quote = { $regex: query.keywords, $options: 'i' };
    }

    if (query.author) {
      queryObject.author = { $regex: query.author, $options: 'i' };
    }

    const quotes = await this.quoteModel
      .find({ ...queryObject })
      .sort()
      .limit(responsePerPage)
      .skip(skip);

    const quotesCount = await this.quoteModel.countDocuments({
      ...queryObject,
    });

    return {
      total: quotesCount,
      limit: responsePerPage,
      page: currentPage,
      skip,
      quotes,
    };
  }
}
