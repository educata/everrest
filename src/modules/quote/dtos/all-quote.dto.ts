import { IsOptional, IsString } from 'class-validator';
import { QuoteExpectionKeys } from 'src/enums';
import { PaginationQueryDto } from 'src/shared';

export class AllQuoteDto extends PaginationQueryDto {
  @IsOptional()
  @IsString({ message: QuoteExpectionKeys.AuthorNameShouldBeString })
  author: string;

  @IsOptional()
  @IsString({ message: QuoteExpectionKeys.QuoteKeywordShouldBeString })
  keywords: string;
}
