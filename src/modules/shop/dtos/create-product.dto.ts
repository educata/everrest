import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  IsArray,
  IsPositive,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { ProductExceptionKeys } from 'src/enums';
import { ProductPrice, ProductCategory } from 'src/interfaces';
import { ProductCategoryDto } from './product-category.dto';
import { ProductPriceDto } from './product-price.dto';

export class CreateProductDto {
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

  @Type(() => ProductCategoryDto)
  category: ProductCategory;

  @IsNumber({}, { message: ProductExceptionKeys.WarrantyMustBeNumber })
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
