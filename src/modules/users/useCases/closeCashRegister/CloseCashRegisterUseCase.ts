import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Models
import CashRegister from '@modules/users/infra/models/CashRegister';

// Repositories
import ICashRegistersRepository from '@modules/users/infra/repositories/ICashRegistersRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cash_register_id: string;
}

@injectable()
class CloseCashRegisterUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute({
    user_id,
    cash_register_id,
  }: IRequest): Promise<CashRegister> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) throw new NotFoundError();

    const cashRegister = await this.cashRegistersRepository.findByID(
      cash_register_id,
    );

    if (!cashRegister) throw new NotFoundError();

    const closeCashRegister = Object.assign(cashRegister, {
      closing_balance: cashRegister.current_balance,
      closed_at: new Date(),
    });

    await this.cashRegistersRepository.save(closeCashRegister);

    return closeCashRegister;
  }
}

export default CloseCashRegisterUseCase;
