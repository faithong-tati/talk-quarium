import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): any => {
  return ctx.switchToHttp().getRequest();
});
