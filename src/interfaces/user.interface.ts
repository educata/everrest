import { Gender, UserRole } from '../enums';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  role: UserRole;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
  verified: boolean;
  // additional
  cartID: string;
  chatIds: string[];
}

export type UnwantedKeys = 'password' | 'cartID' | 'chatIds';

export type UserPayload = Omit<User, UnwantedKeys>;
