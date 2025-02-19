import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/common/constants';

import { ErrorException } from '../exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: unknown, info: Error): any {
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        console.error('[JwtAuthGuard][handleRequest] Expected error: ', info);

        throw new ErrorException(ErrorCode.TOKEN_EXPIRED);
      }

      if (info && info.name === 'JsonWebTokenError' && info.message === 'invalid signature') {
        console.error('[JwtAuthGuard][handleRequest] Expected error: ', info);

        throw new ErrorException(ErrorCode.JWT_INVALID_SIGNATURE);
      }

      if (info && info.message === 'No auth token') {
        console.error('[JwtAuthGuard][handleRequest] Expected error: ', info);

        throw new ErrorException(ErrorCode.INVALID_DATA, undefined, '[authToken] is required');
      }

      console.error('[JwtAuthGuard][handleRequest] Unexpected error: ', info);

      throw new InternalServerErrorException(ErrorCode.UNAUTHORIZED);
    }

    return user;
  }
}
