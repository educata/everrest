import { IsOptional, IsString } from 'class-validator';
import { QuoteExpectionKeys } from 'src/enums';

export class UpdateQuoteDto {
  @IsOptional()
  @IsString({ message: QuoteExpectionKeys.AuthorNameShouldBeString })
  author: string;

  @IsOptional()
  @IsString({ message: QuoteExpectionKeys.QuoteShouldBeString })
  quote: string;
}
