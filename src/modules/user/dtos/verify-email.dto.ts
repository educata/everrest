import { IsEmail } from 'class-validator';
import { AuthExpectionKeys } from 'src/enums';

export class VerifyEmailDto {
  @IsEmail({}, { message: AuthExpectionKeys.InvalidEmail })
  email: string;
}
