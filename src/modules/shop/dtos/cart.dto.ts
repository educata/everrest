import { IsString } from 'class-validator';
import { MongooseId } from 'src/shared/mongoose-id.decorator';

// TODO: add validation
export class CartDto {
  @IsString()
  @MongooseId()
  id: string;
  quantity: number;
}
