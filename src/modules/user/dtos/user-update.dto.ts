import { Gender } from 'src/enums';
// TODO: add validation
export class UpdateUserDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}
