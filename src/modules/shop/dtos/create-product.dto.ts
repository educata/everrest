import { ProductPrice, ProductCategory } from 'src/interfaces';
// TODO: add validation
export class CreateProductDto {
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  images: string[];
  price: ProductPrice;
  stock: number;
  category: ProductCategory;
  brand: string;
  warranty: number;
}
