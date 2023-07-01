import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { IJwtUser } from 'src/auth/types/auth.jwt.interface';

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtUser => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new BadRequestException('unauthorized');
    return request.user;
  },
);
