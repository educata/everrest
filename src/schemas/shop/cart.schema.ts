import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartProduct, CartTotal } from 'src/interfaces';

export type CartDocument = HydratedDocument<Cart>;

Schema();
export class Cart {
  @Prop(
    raw({
      price: {
        type: { current: { type: Number }, beforeDiscount: { type: Number } },
      },
      quantity: { type: Number },
      products: { type: Number },
    }),
  )
  total: CartTotal;

  @Prop({
    type: [
      {
        quantity: { type: Number },
        pricePerQuantity: { type: Number },
        productId: { type: String },
      },
    ],
  })
  products: CartProduct[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
