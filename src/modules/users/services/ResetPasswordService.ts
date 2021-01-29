import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import UserTokenNotFoundError from '../errors/UserTokenNotFoundError';
import UserNotFoundError from '../errors/UserNotFoundError';
import TokenExpiredError from '../errors/TokenExpiredError';
import InvalidTokenTypeToRequest from '../errors/InvalidTokenTypeToRequest';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new UserTokenNotFoundError();
    }

    if (userToken.type !== 'resetPassword') {
      throw new InvalidTokenTypeToRequest();
    }

    const user = await this.usersRepository.findByID(userToken.user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new TokenExpiredError();
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
