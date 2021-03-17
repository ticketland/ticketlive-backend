import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Models
import User from '@modules/users/infra/entities/typeorm/User';

// Repositories
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowOneUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}

export default ShowOneUserService;
