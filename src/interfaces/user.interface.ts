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
  // additional
  cartID: string;
  chatIds: string[];
}
