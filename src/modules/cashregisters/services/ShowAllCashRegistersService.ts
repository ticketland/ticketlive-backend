import { injectable, inject } from 'tsyringe';

// Models
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';
import ICashRegistersRepository from '../repositories/ICashRegistersRepository';

interface IRequest {
  user_id: string | string[] | null;
  state: string | string[] | null;
}

@injectable()
class ShowAllCashRegistersService {
  constructor(
    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute({ user_id, state }: IRequest): Promise<CashRegister[]> {
    const cashRegisters = await this.cashRegistersRepository.all({
      user_id,
      state,
    });

    return cashRegisters;
  }
}

export default ShowAllCashRegistersService;
