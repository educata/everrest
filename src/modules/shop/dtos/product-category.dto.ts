import { IsString, IsUrl } from 'class-validator';
import { ProductExceptionKeys } from 'src/enums';
import { ProductCategory } from 'src/interfaces';
import { MongooseId } from 'src/shared';

export class ProductCategoryDto implements ProductCategory {
  @IsString()
  @MongooseId()
  id: string;

  @IsString({ message: ProductExceptionKeys.InvalidCategoryName })
  name: string;

  @IsString()
  @IsUrl({}, { message: ProductExceptionKeys.InvalidCategoryImage })
  image: string;
}
