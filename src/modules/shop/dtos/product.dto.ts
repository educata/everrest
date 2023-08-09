import { ProductPrice, ProductCategory } from 'src/interfaces';

export class ProductDto {
  id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  images: string[];
  price: ProductPrice;
  stock: number;
  rating: number;
  category: ProductCategory;
  brand: string;
  warranty: number;
}
