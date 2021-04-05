import { inject, injectable } from 'tsyringe';

import Transaction from '@modules/transactions/infra/models/Transaction';
import ICashRegistersRepository from '@modules/users/infra/repositories/ICashRegistersRepository';
import NotFoundError from '@shared/errors/NotFoundError';

interface IRequest {
  cash_register_id: string;
}

@injectable()
class ListCashRegisterTransactionsUseCase {
  constructor(
    @inject('CashRegistersRepository')
    private cashRegistersRepository: ICashRegistersRepository,
  ) {}

  async execute({ cash_register_id }: IRequest): Promise<Transaction[]> {
    const cashRegister = await this.cashRegistersRepository.findByID(
      cash_register_id,
    );

    if (!cashRegister) throw new NotFoundError();

    const transactions = await this.cashRegistersRepository.loadTransactions(
      cashRegister,
    );

    return transactions;
  }
}

export { ListCashRegisterTransactionsUseCase };
