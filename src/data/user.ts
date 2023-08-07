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
    address: 'nowhere',
    phone: '+123456789',
    zipcode: '1234',
    avatar: 'https://api.dicebear.com/6.x/lorelei/svg?flip=false',
    gender: Gender.Male,
    cart: {
      _id: '',
      products: [],
      total: {
        price: {
          current: 0,
          beforeDiscount: 0,
        },
        quantity: 0,
        products: 0,
      },
    },
    chatIds: [],
  },
];
