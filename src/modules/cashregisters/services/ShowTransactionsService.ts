import { injectable, inject } from 'tsyringe';

// Models
import Transaction from '@modules/cashregisters/infra/typeorm/entities/Transaction';
import ITransactionsRepostory from '../repositories/ITransactionsRepository';

@injectable()
class ShowTransactionsService {
  constructor(
    @inject('TransactionsRepostory')
    private transactionsRepostory: ITransactionsRepostory,
  ) {}

  public async execute(): Promise<Transaction[]> {
    // TODO: implement filters
    const paymentMethods = await this.transactionsRepostory.all();

    return paymentMethods;
  }
}

export default ShowTransactionsService;
