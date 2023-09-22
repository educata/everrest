import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { GlobalExceptionKeys } from 'src/enums';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: GlobalExceptionKeys.PageIndexNotNumber })
  @Min(API_CONFIG.MINIMUM_PAGE_INDEX, {
    message: GlobalExceptionKeys.PageIndexTooLow,
  })
  page_index: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: GlobalExceptionKeys.PageSizeNotNumber })
  @Min(API_CONFIG.MINIMUM_PAGE_SIZE, {
    message: GlobalExceptionKeys.PageSizeTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_PAGE_SIZE, {
    message: GlobalExceptionKeys.PageSizeTooHigh,
  })
  page_size: number;
}
