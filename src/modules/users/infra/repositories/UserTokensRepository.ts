import { getRepository, Repository } from 'typeorm';

// Interfaces
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// Models
import UserToken from '@modules/users/infra/entities/typeorm/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(
    user_id: string,
    type: 'resetPassword' | 'completeSignUp',
  ): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      type,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
