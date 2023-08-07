import { CurrencyCode } from '../enums';

export interface Product {
  _id: string;
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
  warranty: string;
}

export interface ProductPrice {
  current: number;
  currency: CurrencyCode;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
}
