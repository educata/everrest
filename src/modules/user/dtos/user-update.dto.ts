import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsEmail,
  IsPhoneNumber,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { AuthExpectionKeys, Gender } from 'src/enums';

export class UpdateUserDto {
  @IsOptional()
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

  @IsOptional()
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

  @IsOptional()
  @IsNumber({}, { message: AuthExpectionKeys.InvalidAge })
  @IsPositive({ message: AuthExpectionKeys.InvalidAge })
  age: number;

  @IsOptional()
  @IsEmail({}, { message: AuthExpectionKeys.InvalidEmail })
  email: string;

  @IsOptional()
  @IsString({ message: AuthExpectionKeys.InvalidAddress })
  address: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: AuthExpectionKeys.InvalidPhoneNumber })
  phone: string;

  @IsOptional()
  @IsString({ message: AuthExpectionKeys.InvalidZipcode })
  zipcode: string;

  @IsOptional()
  @IsUrl({}, { message: AuthExpectionKeys.InvalidAvatar })
  avatar: string;

  @IsOptional()
  @IsEnum(Gender, { message: AuthExpectionKeys.InvalidGender })
  gender: Gender;
}
