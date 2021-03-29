import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Configs
import authConfig from '@config/auth';

// Errors
import AppError from '@shared/errors/AppError';

import UsersRepository from '@modules/users/infra/repositories/implementations/UsersRepository'
import NotFoundError from '@shared/errors/NotFoundError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: user_id } = decoded as TokenPayload;

    const user = await usersRepository.findByID(user_id)
    if (!user) throw new NotFoundError()

    request.user = { id: user_id }

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
