import UserToken from '@modules/users/infra/entities/typeorm/UserToken';

export default interface IUserTokensRepository {
  generate(
    user_id: string,
    type: 'resetPassword' | 'completeSignUp',
  ): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
