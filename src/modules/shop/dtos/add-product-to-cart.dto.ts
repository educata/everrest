import { IsNumber, IsString, Min } from 'class-validator';
import { ProductExceptionKeys } from 'src/enums';
import { MongooseId } from 'src/shared/mongoose-id.decorator';

export class AddProductToCartDto {
  @IsString()
  @MongooseId()
  id: string;

  @IsNumber({}, { message: ProductExceptionKeys.InvalidQuantity })
  @Min(1, { message: ProductExceptionKeys.InvalidQuantity })
  quantity: number;
}