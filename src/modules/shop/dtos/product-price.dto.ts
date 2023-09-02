import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { CurrencyCode, ProductExceptionKeys } from 'src/enums';
import { ProductPrice } from 'src/interfaces';

export class ProductPriceDto implements ProductPrice {
  @IsNumber({}, { message: ProductExceptionKeys.InvalidCurrentPrice })
  @IsPositive({ message: ProductExceptionKeys.InvalidCurrentPrice })
  current: number;

  @IsString({ message: ProductExceptionKeys.InvalidCurrency })
  @IsEnum(CurrencyCode, { message: ProductExceptionKeys.InvalidCurrency })
  currency: CurrencyCode;

  @IsNumber({}, { message: ProductExceptionKeys.InvalidBeforeDiscountPrice })
  beforeDiscount: number;

  @IsNumber()
  @Min(API_CONFIG.MINIMUM_DISCOUNT_PERCENTAGE, {
    message: ProductExceptionKeys.DiscountTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_DISCOUNT_PERCENTAGE, {
    message: ProductExceptionKeys.DiscountTooHigh,
  })
  discountPercentage: number;
}
