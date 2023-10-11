import { IsString, MinLength } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { QRCodeExpectionKeys } from 'src/enums';

export class GenerateQrCodeDto {
  @IsString({ message: QRCodeExpectionKeys.TextShouldNotBeEmpty })
  @MinLength(API_CONFIG.MIN_QRCODE_TEXT_LENGTH, {
    message: QRCodeExpectionKeys.TextShouldHaveValue,
  })
  text: string;
}
