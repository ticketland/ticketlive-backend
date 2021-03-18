import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Configs
import authConfig from '@config/auth';

// Errors
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // sub contains [id, role]
    const splitedSub = sub.split(',');

    request.user = { id: splitedSub[0], role: splitedSub[1] };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}