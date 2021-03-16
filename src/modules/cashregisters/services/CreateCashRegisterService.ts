import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';
import UserAlreadyHaveACashRegisterOpenError from '@modules/cashregisters/errors/UserAlreadyHaveACashRegisterOpenError';

// Models
import CashRegister from '@modules/cashregisters/infra/entities/typeorm/CashRegister';

// Repositories
import ICashRegistersRepository from '@modules/cashregisters/repositories/ICashRegistersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  opening_value: number;
}

@injectable()
class CreateCashRegisterService {
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
    const user = await this.usersRepository.findByID(user_id);

    if (!user) throw new NotFoundError();

    const oneHasOpenCashRegister = await this.cashRegistersRepository.all({
      user_id,
      state: 'opened',
    });

    if (oneHasOpenCashRegister.length !== 0)
      throw new UserAlreadyHaveACashRegisterOpenError();

    const cashRegisters = await this.cashRegistersRepository.create({
      user_id: user.id,
      opening_value,
    });

    return cashRegisters;
  }
}

export default CreateCashRegisterService;
