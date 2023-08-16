import { Gender } from 'src/enums';
import { User } from 'src/interfaces';
// dummy data before initial database
// TODO: Fill later
export const USERS: User[] = [
  {
    _id: '99c5256ab7639f9b818af4a3b7ff0ca5',
    firstName: 'John',
    lastName: 'Doe',
    age: 50,
    email: 'johndoe@gmail.com',
    password: 'password123',
    address: 'nowhere',
    phone: '+123456789',
    zipcode: '1234',
    avatar: 'https://api.dicebear.com/6.x/lorelei/svg?flip=false',
    gender: Gender.Male,
    cartID: '',
    chatIds: [],
  },
];
