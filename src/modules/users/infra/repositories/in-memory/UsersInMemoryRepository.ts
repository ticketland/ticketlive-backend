import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../models/User';
import IUsersRepository from '../IUsersRepository';

class UsersInMemoryRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
      cash_registers: [],
    });

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  async findByID(id: string, relations?: string[]): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }
}

export { UsersInMemoryRepository };
