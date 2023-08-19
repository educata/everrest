import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalExceptionKeys } from './enums';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as {
      message: string | string[];
      error: string;
      statusCode: number;
    };

    const exceptionResponseNotFoundURL = [
      `Cannot GET ${request.url}`,
      `Cannot POST ${request.url}`,
      `Cannot PATCH ${request.url}`,
      `Cannot PUT ${request.url}`,
      `Cannot DELETE ${request.url}`,
      `Cannot OPTIONS ${request.url}`,
    ];

    response.status(status).json({
      error: exceptionResponse.error,
      errorKeys: exceptionResponseNotFoundURL.includes(
        exceptionResponse.message as string,
      )
        ? [GlobalExceptionKeys.EndPointNotFound]
        : exceptionResponse.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
