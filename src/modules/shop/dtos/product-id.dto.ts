import { IsString } from 'class-validator';
import { MongooseId } from 'src/shared';

export class ProductIdDto {
  @IsString()
  @MongooseId()
  id: string;
}
