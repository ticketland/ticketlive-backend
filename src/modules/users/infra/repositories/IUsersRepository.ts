import { DeleteResult } from 'typeorm';

// Dtos
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// Models
import User from '@modules/users/infra/models/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string, relations?: string[]): Promise<User | undefined>;
  delete(id: string): Promise<DeleteResult>;
}
