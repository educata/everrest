import { IsEmail, IsString } from 'class-validator';
import { AuthExpectionKeys } from 'src/enums';

export class SignInDto {
  @IsEmail({}, { message: AuthExpectionKeys.InvalidEmail })
  email: string;

  @IsString()
  password: string;
}
