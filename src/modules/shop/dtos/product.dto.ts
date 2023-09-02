import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ProductCategory, ProductPrice, ProductRating } from 'src/interfaces';
import { Product } from 'src/schemas';
import { ProductPriceDto } from './product-price.dto';
import { API_CONFIG } from 'src/consts';
import { ProductCategoryDto } from './product-category.dto';
import { ProductExceptionKeys } from 'src/enums';

export class ProductDto extends Product {
  @IsString({ message: ProductExceptionKeys.InvalidTitle })
  title: string;

  @IsString({ message: ProductExceptionKeys.InvalidBrand })
  brand: string;

  @Type(() => ProductPriceDto)
  price: ProductPrice;

  @IsNumber({}, { message: ProductExceptionKeys.InvalidStock })
  @Min(API_CONFIG.MINIMUM_STOCK, { message: ProductExceptionKeys.StockTooLow })
  stock: number;

  @IsArray({ message: ProductExceptionKeys.InvalidImages })
  @IsString({ each: true, message: ProductExceptionKeys.InvalidImages })
  images: string[];

  @IsNumber({}, { message: ProductExceptionKeys.InvalidRating })
  @Min(API_CONFIG.MINIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooHigh,
  })
  rating: number;

  @IsArray()
  ratings: ProductRating[];

  @Type(() => ProductCategoryDto)
  category: ProductCategory;

  @IsNumber()
  @IsPositive({ message: ProductExceptionKeys.InvalidWarranty })
  warranty: number;

  @IsString({ message: ProductExceptionKeys.InvalidDate })
  @IsDateString({}, { message: ProductExceptionKeys.DateNotIsoFormat })
  issueDate: string;

  @IsString({ message: ProductExceptionKeys.InvalidThumbnail })
  @IsUrl({}, { message: ProductExceptionKeys.ThumbnailNotUrl })
  thumbnail: string;

  @IsString({ message: ProductExceptionKeys.InvalidDescription })
  description: string;
}
