import { injectable, inject } from 'tsyringe';

// Models
import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class ShowTransactionsService {
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

export default ShowTransactionsService;
