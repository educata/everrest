import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { AuthExpectionKeys, Gender } from 'src/enums';

export class SignUpDto {
  @IsString({
    message: AuthExpectionKeys.FirstnameShouldBeString,
  })
  @MinLength(API_CONFIG.MIN_FIRSTNAME_LENGTH, {
    message: AuthExpectionKeys.FirstnameTooShort,
  })
  @MaxLength(API_CONFIG.MAX_FIRSTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooLong,
  })
  firstName: string;

  @IsString({
    message: AuthExpectionKeys.LastnameShouldBeString,
  })
  @MinLength(API_CONFIG.MIN_LASTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooShort,
  })
  @MaxLength(API_CONFIG.MAX_LASTNAME_LENGTH, {
    message: AuthExpectionKeys.LastnameTooLong,
  })
  lastName: string;

  @IsNumber({}, { message: AuthExpectionKeys.InvalidAge })
  @IsPositive({ message: AuthExpectionKeys.InvalidAge })
  age: number;

  @IsEmail({}, { message: AuthExpectionKeys.InvalidEmail })
  email: string;

  @IsString({ message: AuthExpectionKeys.InvalidPassword })
  @MinLength(API_CONFIG.MIN_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooShort,
  })
  @MaxLength(API_CONFIG.MAX_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooLong,
  })
  password: string;

  @IsString({ message: AuthExpectionKeys.InvalidAddress })
  address: string;

  @IsPhoneNumber(null, { message: AuthExpectionKeys.InvalidPhoneNumber })
  phone: string;

  @IsString({ message: AuthExpectionKeys.InvalidZipcode })
  zipcode: string;

  @IsUrl({}, { message: AuthExpectionKeys.InvalidAvatar })
  avatar: string;

  @IsEnum(Gender, { message: AuthExpectionKeys.InvalidGender })
  gender: Gender;
}
