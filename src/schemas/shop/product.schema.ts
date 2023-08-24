import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductPrice, ProductCategory, ProductRating } from 'src/interfaces';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop() title: string;
  @Prop() description: string;
  @Prop() issueDate: string;
  @Prop() thumbnail: string;
  @Prop() stock: number;
  @Prop() rating: number;
  @Prop() brand: string;
  @Prop() warranty: number;
  @Prop([String]) images: string[];

  @Prop({
    type: [
      {
        userId: { type: String },
        value: { type: Number },
        createdAt: { type: String },
        _id: false,
      },
    ],
    select: false,
  })
  ratings: ProductRating[];

  @Prop(
    raw({
      current: { type: Number },
      currency: { type: String },
      beforeDiscount: { type: Number },
      discountPercentage: { type: Number },
    }),
  )
  price: ProductPrice;

  @Prop(
    raw({
      id: { type: String },
      name: { type: String },
      image: { type: String },
    }),
  )
  category: ProductCategory;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
