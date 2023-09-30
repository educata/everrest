import { IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString({ message: '' })
  author: string;

  @IsString({ message: '' })
  quote: string;
}
