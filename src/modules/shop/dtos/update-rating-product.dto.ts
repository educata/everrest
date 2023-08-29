import { IsNumber, IsString, Max, Min } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { GlobalExceptionKeys } from 'src/enums';
import { MongooseId } from 'src/shared/mongoose-id.decorator';

export class UpdateRatingProductDto {
  @IsString()
  @MongooseId()
  productId: string;

  // @IsNumber()
  // @Min(API_CONFIG.MINIMUM_RATING, { message: GlobalExceptionKeys.RatingTooLow })
  // @Max(API_CONFIG.MAXIMUM_RATING, {
  //   message: GlobalExceptionKeys.RatingTooHigh,
  // })
  rate: number;
}
