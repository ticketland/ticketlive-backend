import { DeleteResult, getRepository, Repository } from 'typeorm';
// Repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

// Models
import User from '../entities/User';

// Interfaces

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
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

  public async loadUserInformation(user: User): Promise<User> {
    const { id } = user;

    const userInfo = await this.ormRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.role'])
      .leftJoinAndSelect('user.client', 'client')
      .leftJoinAndSelect('user.instructor', 'instructor')
      .where('user.id = :id', { id })
      .getOne();

    if (!userInfo) throw new AppError('User not found', 404);

    if (userInfo.client) delete userInfo.instructor;
    else delete userInfo.client;

    return userInfo;
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
