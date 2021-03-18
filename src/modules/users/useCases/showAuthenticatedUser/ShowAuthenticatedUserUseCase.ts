import { injectable, inject } from 'tsyringe';

// Models
import User from '@modules/users/infra/models/User';

// Repositories
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowAuthenticatedUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return user!;
  }
}

export default ShowAuthenticatedUserUseCase;
