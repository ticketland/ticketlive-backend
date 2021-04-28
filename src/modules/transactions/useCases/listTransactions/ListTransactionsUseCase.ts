import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';

interface IRequest {
  cash_register_id: string;
}

@injectable()
class ListTransactionsUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ cash_register_id }: IRequest): Promise<Transaction[]> {
    if (cash_register_id) {
      const paymentMethods = await this.transactionsRepository.findByCashRegisterID(
        cash_register_id,
      );

      return paymentMethods;
    }

    const paymentMethods = await this.transactionsRepository.all();

    return paymentMethods;
  }
}

export default ListTransactionsUseCase;
