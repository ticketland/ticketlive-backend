import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';

@injectable()
class ListTransactionsUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<Transaction[]> {
    // TODO: implement filters
    const paymentMethods = await this.transactionsRepository.all();

    return paymentMethods;
  }
}

export default ListTransactionsUseCase;
