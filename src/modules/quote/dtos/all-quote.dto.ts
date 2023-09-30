import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QuoteExpectionKeys } from 'src/enums';
import { PaginationQueryDto } from 'src/shared';

export class AllQuoteDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString({ message: QuoteExpectionKeys.AuthorNameShouldBeString })
  author: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString({ message: QuoteExpectionKeys.QuoteKeywordShouldBeString })
  keywords: string;
}
