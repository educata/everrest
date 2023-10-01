import { IsString } from 'class-validator';
import { QuoteExpectionKeys } from 'src/enums';

export class QuoteDto {
  @IsString({ message: QuoteExpectionKeys.AuthorNameShouldBeString })
  author: string;

  @IsString({ message: QuoteExpectionKeys.QuoteShouldBeString })
  quote: string;

  @IsString({ message: QuoteExpectionKeys.QuoteTypeShouldBeString })
  type: string;
}
