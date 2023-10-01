import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema({ versionKey: false })
export class Quote {
  @Prop() author: string;
  @Prop() quote: string;
  @Prop() type: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
