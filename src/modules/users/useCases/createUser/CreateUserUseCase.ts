import { injectable, inject } from 'tsyringe';

// Errors
import EmailAlreadyInUseException from '@modules/users/errors/EmailAlreadyInUseException';

// Entities
import User from '@modules/users/infra/models/User';

// Interfaces
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new EmailAlreadyInUseException();

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
