import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ObjectNotFoundError } from '../../domain/error/object-not-found.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): Response {
    let code: HttpStatus;
    let error: string;
    let message: string | Array<string>;

    if (exception instanceof HttpException) {
      code = exception.getStatus();
      error = exception.message;

      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        error = exceptionResponse['error'] ?? error;
        message = exceptionResponse['message'];
      }
    } else if (exception instanceof ObjectNotFoundError) {
      code = HttpStatus.NOT_FOUND;
      error = exception.message;
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      error = 'Internal server error';
    }
    message ??= error;

    this.loggerException(exception, host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(code).json({ message });
  }

  private loggerException(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.logger.error(exception.message, exception.stack, {
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
      },
    });
  }
}
