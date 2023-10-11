import { IsString, IsUrl, MinLength } from 'class-validator';
import { API_CONFIG } from 'src/consts';
import { QRCodeExpectionKeys } from 'src/enums';

export class GenerateQrCodeWithImageDto {
  @IsString({ message: QRCodeExpectionKeys.TextShouldNotBeEmpty })
  @MinLength(API_CONFIG.MIN_QRCODE_TEXT_LENGTH, {
    message: QRCodeExpectionKeys.TextShouldHaveValue,
  })
  text: string;

  @IsString({ message: QRCodeExpectionKeys.ImageUrlShouldNotBeEmpty })
  @IsUrl({}, { message: QRCodeExpectionKeys.InvalidImageURL })
  imageURL: string;
}
