import { IsString } from 'class-validator';
import { QRCodeExpectionKeys } from 'src/enums';

export class GenerateQrCodeDto {
  @IsString({ message: QRCodeExpectionKeys.TextShouldNotBeEmpty })
  text: string;
}
