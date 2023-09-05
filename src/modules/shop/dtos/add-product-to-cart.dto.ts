import { IsNumber, IsString, Min } from 'class-validator';
import { ProductExceptionKeys } from 'src/enums';
import { MongooseId } from 'src/shared';

export class AddProductToCartDto {
  @IsString()
  @MongooseId()
  id: string;

  @IsNumber({}, { message: ProductExceptionKeys.QuantityMustBeNumber })
  @Min(1, { message: ProductExceptionKeys.InvalidQuantity })
  quantity: number;
}
