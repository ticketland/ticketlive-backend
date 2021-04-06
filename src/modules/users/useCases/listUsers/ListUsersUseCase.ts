import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/models/User';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
