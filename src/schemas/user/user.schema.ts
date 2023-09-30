import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Gender, UserRole } from 'src/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() age: number;
  @Prop() email: string;
  @Prop() password: string;
  @Prop() address: string;
  @Prop() phone: string;
  @Prop() role: UserRole;
  @Prop() zipcode: string;
  @Prop() avatar: string;
  @Prop() gender: Gender;
  @Prop() cartID: string;
  @Prop() verified: boolean;
  @Prop([String]) chatIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
