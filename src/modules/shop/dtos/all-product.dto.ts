import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { ProductPaginationExceptionKeys } from 'src/enums';

export class AllProductsQueryDto {
  @IsOptional()
  @IsNumber({}, { message: ProductPaginationExceptionKeys.PageIndexNotNumber })
  @Min(API_CONFIG.MINIMUM_PAGE_INDEX, {
    message: ProductPaginationExceptionKeys.PageIndexTooLow,
  })
  page_index: number;

  @IsOptional()
  @IsNumber({}, { message: ProductPaginationExceptionKeys.PageSizeNotNumber })
  @Min(API_CONFIG.MINIMUM_PAGE_SIZE, {
    message: ProductPaginationExceptionKeys.PageSizeTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_PAGE_SIZE, {
    message: ProductPaginationExceptionKeys.PageSizeTooHigh,
  })
  page_size: number;
}
