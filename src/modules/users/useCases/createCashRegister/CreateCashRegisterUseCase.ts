import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';
import UserAlreadyHaveACashRegisterOpenError from '@modules/users/errors/UserAlreadyHaveACashRegisterOpenError';

// Models
import CashRegister from '@modules/users/infra/models/CashRegister';

// Repositories
import ICashRegistersRepository from '@modules/users/infra/repositories/ICashRegistersRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  opening_value: number;
}

@injectable()
class CreateCashRegisterUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute({
    user_id,
    opening_value,
  }: IRequest): Promise<CashRegister> {
    const user = await this.usersRepository.findByID(user_id, [
      'cashRegisters',
    ]);

    if (!user) throw new NotFoundError();

    const oneHasOpenCashRegister = !!user.cashRegisters.find(
      cashRegister => cashRegister.closed_at === null,
    );

    if (oneHasOpenCashRegister)
      throw new UserAlreadyHaveACashRegisterOpenError();

    const cashRegisters = await this.cashRegistersRepository.create({
      user_id: user.id,
      opening_value,
    });

    return cashRegisters;
  }
}

export default CreateCashRegisterUseCase;
