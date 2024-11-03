import {
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpExceptionFilter } from 'src/modules/shared/infrastructure/filters/http-exception.filter';
import { StringMother } from '../../domain/mothers/string.mother';
import { ObjectMother } from '../../domain/mothers/object.mother';
import { TestNotFoundError } from '../../domain/test-not-found.error';

describe('HttpExceptionFilter test', () => {
  let mockHost: Partial<ArgumentsHost>;
  let request: any;

  const httpExceptionFilter = new HttpExceptionFilter();
  const loggerErrorSpy = jest
    .spyOn(Logger.prototype, 'error')
    .mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();

    request = {
      method: StringMother.random(),
      url: StringMother.random(),
      body: ObjectMother.random(),
    };
    setHttpHost(request);
  });

  it('should catch HttpException ', async () => {
    const messages = [StringMother.random()];
    const error = StringMother.random();
    const exception = new BadRequestException(messages, error);

    const response = httpExceptionFilter.catch(
      exception,
      mockHost as ArgumentsHost,
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({ message: messages });
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      ...[exception.message, exception.stack, { request }],
    );
  });

  it('should catch HttpException without message', async () => {
    const exception = new BadRequestException(undefined);

    const response = httpExceptionFilter.catch(
      exception,
      mockHost as ArgumentsHost,
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({ message: exception.message });
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      ...[exception.message, exception.stack, { request }],
    );
  });

  it('should catch ObjectNotFoundError', async () => {
    const exception = new TestNotFoundError();

    const response = httpExceptionFilter.catch(
      exception,
      mockHost as ArgumentsHost,
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.json).toHaveBeenCalledWith({ message: 'Test not found' });
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      ...[exception.message, exception.stack, { request }],
    );
  });

  it('should catch unknown Error', async () => {
    const message = StringMother.random();
    const exception = new Error(message);

    const response = httpExceptionFilter.catch(
      exception,
      mockHost as ArgumentsHost,
    );

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal server error',
    });
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      ...[exception.message, exception.stack, { request }],
    );
  });

  function setHttpHost(request: any) {
    mockHost = {
      switchToHttp: () =>
        ({
          getRequest: jest.fn().mockReturnValue(request),
          getResponse: () => ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
          }),
        }) as Partial<HttpArgumentsHost>,
    } as ArgumentsHost;
  }
});
