import { Gender } from 'src/enums';

// TODO: add validation
export class SignUpDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}
