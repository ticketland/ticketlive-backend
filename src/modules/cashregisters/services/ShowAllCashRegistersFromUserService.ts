import { injectable, inject } from 'tsyringe';

// Errors

// Models
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';
import ICashRegistersRepository from '../repositories/ICashRegistersRepository';

interface IRequest {
  user_id: string;
  filters: string[];
}

@injectable()
class ShowTransactionsService {
  constructor(
    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  public async execute({
    user_id,
    filters,
  }: IRequest): Promise<CashRegister[]> {
    const cashRegister = await this.cashRegistersRepository.findCashRegisterFromUser(
      user_id,
      filters,
    );

    return cashRegister;
  }
}

export default ShowTransactionsService;
