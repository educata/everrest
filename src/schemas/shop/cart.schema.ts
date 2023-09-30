import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartProduct, CartTotal } from 'src/interfaces';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ versionKey: false })
export class Cart {
  @Prop() userId: string;
  @Prop() createdAt: string;

  @Prop(
    raw({
      price: raw({
        current: { type: Number },
        beforeDiscount: { type: Number },
      }),
      quantity: { type: Number },
      products: { type: Number },
    }),
  )
  total: CartTotal;

  @Prop({
    type: [
      {
        _id: false,
        quantity: { type: Number },
        pricePerQuantity: { type: Number },
        beforeDiscountPrice: { type: Number },
        productId: { type: String },
      },
    ],
  })
  products: CartProduct[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
