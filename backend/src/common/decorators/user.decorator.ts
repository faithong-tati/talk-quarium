/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserDto } from '../dtos';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserDto => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
