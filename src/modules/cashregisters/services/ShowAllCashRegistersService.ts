import { injectable, inject } from 'tsyringe';

// Models
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';
import ICashRegistersRepository from '../repositories/ICashRegistersRepository';

@injectable()
class ShowAllCashRegistersService {
  constructor(
    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute(): Promise<CashRegister[]> {
    const cashRegisters = await this.cashRegistersRepository.all();

    return cashRegisters;
  }
}

export default ShowAllCashRegistersService;
