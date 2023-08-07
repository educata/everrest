import { Gender } from '../enums';
import { Cart } from '../interfaces';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
  // additional
  cart: Cart;
  chatIds: string[];
}
