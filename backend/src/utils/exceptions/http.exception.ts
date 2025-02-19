import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from 'src/common/constants';

import { getResponseStatus } from '../helpers';

interface ExceptionResponse {
  message?: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() as HttpStatus;
    const exceptionResponse = exception.getResponse();
    const errorResponse = exceptionResponse as ExceptionResponse;

    if (status === HttpStatus.BAD_REQUEST && errorResponse?.message) {
      const messages = errorResponse.message;

      response.status(status).json(getResponseStatus(ErrorCode.INVALID_DATA, undefined, messages));

      return;
    }

    response.status(status).json(getResponseStatus(ErrorCode.SERVER_ERROR, undefined));
  }
}
