import { DeleteResult } from 'typeorm';
// Models
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string, relations?: string[]): Promise<User | undefined>;
  delete(id: string): Promise<DeleteResult>;
  loadUserInformation(user: User): Promise<User>;
}
