import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsPhoneNumber,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { AuthExpectionKeys, Gender } from 'src/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
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
  @ApiProperty({
    required: false,
  })
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
  @ApiProperty({
    required: false,
  })
  @IsNumber({}, { message: AuthExpectionKeys.InvalidAge })
  @IsPositive({ message: AuthExpectionKeys.InvalidAge })
  age: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString({ message: AuthExpectionKeys.InvalidAddress })
  address: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsPhoneNumber(null, { message: AuthExpectionKeys.InvalidPhoneNumber })
  phone: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString({ message: AuthExpectionKeys.InvalidZipcode })
  zipcode: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsUrl({}, { message: AuthExpectionKeys.InvalidAvatar })
  avatar: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsEnum(Gender, { message: AuthExpectionKeys.InvalidGender })
  gender: Gender;
}
