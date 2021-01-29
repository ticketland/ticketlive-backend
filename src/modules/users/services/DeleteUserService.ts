import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

// Errors
import AppError from '@shared/errors/AppError';

// Interfaces
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<DeleteResult> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return this.usersRepository.delete(user_id);
  }
}

export default DeleteUserService;
