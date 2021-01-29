import { injectable, inject } from 'tsyringe';

// Errors
import AppError from '@shared/errors/AppError';

// Models
import User from '@modules/users/infra/typeorm/entities/User';
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
      throw new AppError('User not Found!', 404);
    }

    return this.usersRepository.loadUserInformation(user);
  }
}

export default ShowOneUserService;
