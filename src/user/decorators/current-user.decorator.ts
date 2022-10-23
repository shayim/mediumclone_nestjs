import {
  createParamDecorator,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!key) return request.user;
    if (!request.user[key])
      throw new NotAcceptableException(`currentUser has no key ${key}`);

    return request.user[key];
  },
);
