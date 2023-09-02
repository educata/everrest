import { IsDateString, IsNumber, IsString, Max, Min } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { ProductExceptionKeys } from 'src/enums';
import { ProductRating } from 'src/interfaces';
import { MongooseId } from 'src/shared/mongoose-id.decorator';

export class ProductRatingDto implements ProductRating {
  @IsString()
  @MongooseId()
  userId: string;

  @IsString()
  @IsDateString()
  createdAt: string;

  @IsNumber()
  @Min(API_CONFIG.MINIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooLow,
  })
  @Max(API_CONFIG.MAXIMUM_RATING, {
    message: ProductExceptionKeys.RatingTooHigh,
  })
  value: number;
}
