import { IsString, MaxLength, MinLength } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { AuthExpectionKeys } from 'src/enums';

export class UpdateUserPasswordDto {
  @IsString({ message: AuthExpectionKeys.InvalidOldPassword })
  oldPassword: string;

  @IsString({ message: AuthExpectionKeys.InvalidChangePassword })
  @MinLength(API_CONFIG.MIN_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooShort,
  })
  @MaxLength(API_CONFIG.MAX_PASSWORD_LENGTH, {
    message: AuthExpectionKeys.PasswordTooLong,
  })
  newPassword: string;
}
