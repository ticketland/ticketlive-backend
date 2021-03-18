import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

// Errors
import AppError from '@shared/errors/AppError';

// Configs
import authConfig from '@config/auth';

import User from '@modules/users/infra/models/User';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import UnauthorizedUserError from '@modules/users/errors/UnauthorizedUserError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedUserError('Incorrect email/password combination.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: `${user.id.toString()}`,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserUseCase;
