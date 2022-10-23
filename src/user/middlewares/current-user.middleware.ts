import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import { promisify } from 'util';
const verifyAsync: (token: string, secret: Secret) => JwtPayload = promisify<
  string,
  Secret
>(verify);

declare module 'Express' {
  interface Request {
    user: { sub: string };
  }
}

export class CurrentUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(/\s+/)[1];
    if (token) {
      try {
        const jwt = await verifyAsync(token, 'secret');
        req.user = { sub: jwt.sub };
      } catch (error) {
        // logger(error.message);
      }
    }

    next();
  }
}
