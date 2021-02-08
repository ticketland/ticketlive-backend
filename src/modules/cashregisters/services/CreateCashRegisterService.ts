import { injectable, inject } from 'tsyringe';

// Errors
import UserNotFoundError from '@modules/users/errors/UserNotFoundError';
import UserAlreadyHaveACashRegisterOpenError from '@modules/cashregisters/errors/UserAlreadyHaveACashRegisterOpenError';
// Models
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';

// Repositories
import ICashRegistersRepository from '@modules/cashregisters/repositories/ICashRegistersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  open_value: number;
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
    open_value,
  }: IRequest): Promise<CashRegister> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) throw new UserNotFoundError();

    const oneHasOpenCashRegister = await this.cashRegistersRepository.findCashRegisterFromUser(
      user_id,
      [''],
    );

    if (oneHasOpenCashRegister.length !== 0)
      throw new UserAlreadyHaveACashRegisterOpenError();

    const cashRegisters = await this.cashRegistersRepository.create({
      usuario_id: user.id,
      valor_abertura: open_value,
    });

    return cashRegisters;
  }
}

export default CreateCashRegisterService;
