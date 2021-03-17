import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

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
      throw new NotFoundError();
    }

    return this.usersRepository.delete(user_id);
  }
}

export default DeleteUserService;
