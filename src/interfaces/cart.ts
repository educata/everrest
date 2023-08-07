import { Product } from './product';

export interface Cart {
  _id: string;
  products: CartProduct[];
  total: {
    price: {
      current: number;
      beforeDiscount: number;
    };
    quantity: number;
    products: number;
  };
}

export interface CartProduct extends Product {
  quantity: number;
  pricePerQuantity: number;
}
