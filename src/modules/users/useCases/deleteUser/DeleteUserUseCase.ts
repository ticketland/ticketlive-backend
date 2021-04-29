import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/models/User';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}

export default CreateUserService;
