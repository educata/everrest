import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QuoteExpectionKeys } from 'src/enums';

export class UpdateQuoteDto {
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
  @IsString({ message: QuoteExpectionKeys.QuoteShouldBeString })
  quote: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString({ message: QuoteExpectionKeys.QuoteTypeShouldBeString })
  type: string;
}
