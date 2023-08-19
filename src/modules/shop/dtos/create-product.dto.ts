import { ProductPrice, ProductCategory } from 'src/interfaces';

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
