import { injectable, inject } from 'tsyringe';

// Errors
import UserNotFoundError from '@modules/users/errors/UserNotFoundError';
import CashRegisterNotFoundError from '@modules/cashregisters/errors/CashRegisterNotFoundError';

// Models
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';

// Repositories
import ICashRegistersRepository from '@modules/cashregisters/repositories/ICashRegistersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cash_register_id: string;
  close_value: number;
}

@injectable()
class UpdateCashRegisterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute({
    user_id,
    cash_register_id,
    close_value,
  }: IRequest): Promise<CashRegister> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) throw new UserNotFoundError();

    const cashRegister = await this.cashRegistersRepository.findByID(
      cash_register_id,
    );

    if (!cashRegister) throw new CashRegisterNotFoundError();

    const updateCashRegister = Object.assign(cashRegister, {
      valor_fechamento: close_value,
      closed_at: new Date(),
    });

    await this.cashRegistersRepository.save(updateCashRegister);

    return updateCashRegister;
  }
}

export default UpdateCashRegisterService;
