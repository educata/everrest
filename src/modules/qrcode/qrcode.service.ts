import { ExceptionService } from 'src/shared';
import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';
import * as QRCode from 'qrcode';
import { ExceptionStatusKeys, QRCodeExpectionKeys } from 'src/enums';

@Injectable()
export class QrCodeService {
  constructor(private exceptionService: ExceptionService) {}

  generateQrCode(text: string) {
    return new Promise((resolve) => {
      QRCode.toDataURL(text, (err, url) => {
        if (err) {
          this.exceptionService.throwError(
            ExceptionStatusKeys.BadRequest,
            err.message,
            QRCodeExpectionKeys.NotConvertable,
          );
        }
        resolve({
          text,
          type: 'png',
          format: 'base64',
          errorCorrectionLevel: 'M',
          result: url,
        });
      });
    });
  }

  async generateQRCodeWithImage(value: string, imageSrc: string) {
    await this.checkIfImageIsValid(imageSrc).catch(() => {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'Invalid image',
        QRCodeExpectionKeys.InvalidImage,
      );
    });
    const qrCode = QRCode.create(value, { errorCorrectionLevel: 'M' });
    const canvas = createCanvas(
      qrCode.modules.size * 8,
      qrCode.modules.size * 8,
    );
    const ctx = canvas.getContext('2d');
    QRCode.toCanvas(
      canvas,
      value,
      { errorCorrectionLevel: 'M', margin: 0 },
      (error) => error ?? '',
    );

    const center = canvas.width / 2;
    const imageWidth = canvas.width / 4;
    const imageHeight = canvas.height / 4;

    ctx.beginPath();
    ctx.arc(center, center, imageWidth / 2 + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = '#fff';
    ctx.fill();

    const image = await loadImage(imageSrc);

    ctx.drawImage(
      image,
      center - imageWidth / 2,
      center - imageHeight / 2,
      imageWidth,
      imageHeight,
    );

    return {
      text: value,
      type: 'png',
      format: 'base64',
      errorCorrectionLevel: 'M',
      result: canvas.toDataURL(),
    };
  }

  checkIfImageIsValid(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            const currentContentType = response.headers.get('Content-Type');
            if (currentContentType.indexOf('image') > -1) {
              return resolve(url);
            }
          }
          reject(false);
        })
        .catch(reject);
    });
  }
}
