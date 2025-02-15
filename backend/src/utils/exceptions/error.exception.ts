import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDto } from 'src/common/dtos';

import { getResponseStatus } from '../helpers';

export class ErrorException extends HttpException {
  constructor(errorCode: string, data: unknown = null, message: string | string[] = '') {
    const response: ResponseDto = getResponseStatus(errorCode, data, message);

    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
