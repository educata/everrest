import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { SortDirection, SortProductsBy } from 'src/enums';

export class SearchProductsQueryDto {
  @IsOptional()
  @IsString()
  keywords: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsNumber()
  @Min(API_CONFIG.MINIMUM_RATING)
  @Max(API_CONFIG.MAXIMUM_RATING)
  rating: number;

  @IsOptional()
  @IsNumber()
  @Min(API_CONFIG.MINIMUM_PRICE)
  @Max(API_CONFIG.MAXIMUM_PRICE)
  price_min: number;

  @IsOptional()
  @IsNumber()
  @Min(API_CONFIG.MINIMUM_PRICE)
  @Max(API_CONFIG.MAXIMUM_PRICE)
  price_max: number;

  // TODO: Implement property interdependance validation
  @IsOptional()
  @IsEnum(SortProductsBy, {
    // message: 'errors.incorrect_sort_by',
  })
  sort_by: SortProductsBy;

  @IsOptional()
  @IsEnum(SortDirection)
  sort_direction: SortDirection;
}
