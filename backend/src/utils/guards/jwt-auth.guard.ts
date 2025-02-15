import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/common/constants';

import { ErrorException } from '../exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: unknown, user: unknown, info: Error): any {
    if (err || !user) {
      console.error('[JwtAuthGuard][handleRequest] - error: ', info);

      if (info.name === 'JsonWebTokenError' && info.message === 'invalid signature') {
        throw new ErrorException(ErrorCode.JWT_INVALID_SIGNATURE);
      }

      throw new InternalServerErrorException(ErrorCode.UNAUTHORIZED);
    }

    return user;
  }
}
