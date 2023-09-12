import { IsString, IsUrl } from 'class-validator';
import { ProductExceptionKeys } from 'src/enums';
import { ProductCategory } from 'src/interfaces';

export class ProductCategoryDto implements ProductCategory {
  @IsString()
  id: string;

  @IsString({ message: ProductExceptionKeys.InvalidCategoryName })
  name: string;

  @IsString()
  @IsUrl({}, { message: ProductExceptionKeys.InvalidCategoryImage })
  image: string;
}
