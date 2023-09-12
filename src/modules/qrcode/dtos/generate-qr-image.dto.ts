import { IsString } from 'class-validator';
import { QRCodeExpectionKeys } from 'src/enums';

export class GenerateQrCodeWithImageDto {
  @IsString({ message: QRCodeExpectionKeys.TextShouldNotBeEmpty })
  text: string;

  @IsString({ message: QRCodeExpectionKeys.ImageUrlShouldNotBeEmpty })
  imageURL: string;
}
