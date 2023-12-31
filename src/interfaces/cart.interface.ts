export interface Cart {
  _id: string;
  userId: string;
  createdAt: string;
  products: CartProduct[];
  total: CartTotal;
}

export interface CartTotal {
  price: {
    current: number;
    beforeDiscount: number;
  };
  quantity: number;
  products: number;
}

export interface CartProduct {
  quantity: number;
  pricePerQuantity: number;
  productId: string;
  beforeDiscountPrice: number;
}
