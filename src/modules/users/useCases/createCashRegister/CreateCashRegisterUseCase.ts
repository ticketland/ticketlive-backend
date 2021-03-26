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
  opening_balance: number;
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
    opening_balance,
  }: IRequest): Promise<CashRegister> {
    const user = await this.usersRepository.findByID(user_id, [
      'cash_registers',
    ]);

    if (!user) throw new NotFoundError();

    const oneHasOpenCashRegister = !!user.cash_registers.find(
      cashRegister => cashRegister.closed_at === null,
    );

    if (oneHasOpenCashRegister)
      throw new UserAlreadyHaveACashRegisterOpenError();

    const cashRegisters = await this.cashRegistersRepository.create({
      user_id: user.id,
      opening_balance,
      current_balance: opening_balance,
    });

    return cashRegisters;
  }
}

export default CreateCashRegisterUseCase;
