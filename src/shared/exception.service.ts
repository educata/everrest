import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionKeys } from 'src/enums';

@Injectable()
export class ExceptionService {
  public throwError(exception: ExceptionKeys, message?: string) {
    const status = this.getStatusCode(exception);
    const httpExceptionObject: {
      status: number;
      error: ExceptionKeys;
      message?: string;
    } = {
      status,
      error: exception,
    };
    if (message) {
      httpExceptionObject.message = message;
    }
    throw new HttpException(httpExceptionObject, status);
  }

  get statusKeys() {
    return [
      {
        status: 400,
        key: ExceptionKeys.BadRequest,
      },
      {
        status: 401,
        key: ExceptionKeys.Unauthorized,
      },
      {
        status: 402,
        key: ExceptionKeys.PaymentRequired,
      },
      {
        status: 403,
        key: ExceptionKeys.Forbidden,
      },
      {
        status: 404,
        key: ExceptionKeys.NotFound,
      },
      {
        status: 409,
        key: ExceptionKeys.Conflict,
      },
      {
        status: 413,
        key: ExceptionKeys.ContentTooLarge,
      },
      {
        status: 415,
        key: ExceptionKeys.UnsupportedMediaType,
      },
      {
        status: 418,
        key: ExceptionKeys.Teapot,
      },
      {
        status: 420,
        key: ExceptionKeys.EnhanceYourCalm,
      },
    ];
  }

  private getStatusCode(key: ExceptionKeys) {
    switch (key) {
      case ExceptionKeys.BadRequest:
        return HttpStatus.BAD_REQUEST;
      case ExceptionKeys.Unauthorized:
        return HttpStatus.UNAUTHORIZED;
      case ExceptionKeys.PaymentRequired:
        return HttpStatus.PAYMENT_REQUIRED;
      case ExceptionKeys.Forbidden:
        return HttpStatus.FORBIDDEN;
      case ExceptionKeys.NotFound:
        return HttpStatus.NOT_FOUND;
      case ExceptionKeys.Conflict:
        return HttpStatus.CONFLICT;
      case ExceptionKeys.ContentTooLarge:
        return HttpStatus.PAYLOAD_TOO_LARGE;
      case ExceptionKeys.UnsupportedMediaType:
        return HttpStatus.UNSUPPORTED_MEDIA_TYPE;
      case ExceptionKeys.Teapot:
        return HttpStatus.I_AM_A_TEAPOT;
      default:
        return 420;
    }
  }
}
