import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import {
  GlobalExceptionKeys,
  ProductExceptionKeys,
  SortDirection,
  SortProductsBy,
} from 'src/enums';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductsQueryDto {
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

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString()
  keywords: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString()
  category_id: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString()
  brand: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: ProductExceptionKeys.RatingNotNumber })
  @Min(API_CONFIG.MINIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooHigh,
  })
  rating: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: ProductExceptionKeys.PriceMinNotNumber })
  @Min(API_CONFIG.MINIMUM_PRICE, {
    message: ProductExceptionKeys.PriceMinTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_PRICE, {
    message: ProductExceptionKeys.PriceMinTooHigh,
  })
  price_min: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: ProductExceptionKeys.PriceMaxNotNumber })
  @Min(API_CONFIG.MINIMUM_PRICE, {
    message: ProductExceptionKeys.PriceMaxTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_PRICE, {
    message: ProductExceptionKeys.PriceMaxTooHigh,
  })
  price_max: number;

  // TODO: Implement property interdependance validation
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsEnum(SortProductsBy, {
    message: ProductExceptionKeys.IncorrectSortBy,
  })
  sort_by: SortProductsBy;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsEnum(SortDirection, {
    message: ProductExceptionKeys.IncorrectSortDirection,
  })
  sort_direction: SortDirection;
}
