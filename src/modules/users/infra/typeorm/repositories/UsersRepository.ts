import { DeleteResult, getRepository, Repository } from 'typeorm';
// Repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

// Interfaces
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// Models
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne({
      where: { email },
    });

    return foundUser;
  }

  public async findByID(
    id: string,
    relations?: string[],
  ): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne(id, { relations });

    return foundUser;
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
