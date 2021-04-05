import { UsersInMemoryRepository } from '@modules/users/infra/repositories/in-memory/UsersInMemoryRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import AuthenticateUserUseCase from '../AuthenticateUserUseCase';

let usersInMemoryRepository: UsersInMemoryRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserUseCase;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserUseCase(
      usersInMemoryRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await usersInMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '000.000.000-00',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersInMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '000.000.000-00',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
