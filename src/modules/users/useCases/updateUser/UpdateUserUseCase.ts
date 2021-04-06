import { inject, injectable } from 'tsyringe';

import EmailAlreadyInUseError from '@modules/users/errors/EmailAlreadyInUseError';
import User from '@modules/users/infra/models/User';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import NotFoundError from '@shared/errors/NotFoundError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    password,
    cpf,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);
    if (!user) throw new NotFoundError();

    const checkIfEmailIsInUse = await this.usersRepository.findByEmail(email);
    if (checkIfEmailIsInUse && checkIfEmailIsInUse.id !== user_id)
      throw new EmailAlreadyInUseError();

    Object.assign(user, {
      name,
      email,
      password,
      cpf,
    });

    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);
      Object.assign(user, { password: hashedPassword });
    }

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
