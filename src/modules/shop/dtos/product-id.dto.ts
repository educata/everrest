import { IsString } from 'class-validator';
import { MongooseId } from 'src/shared/mongoose-id.decorator';

export class ProductIdDto {
  @IsString()
  @MongooseId()
  id: string;
}
