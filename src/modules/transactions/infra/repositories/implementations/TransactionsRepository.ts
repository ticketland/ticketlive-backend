import { getRepository, Repository } from 'typeorm';

// Repositories
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';

// Interfaces
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

// Models
import Transaction from '@modules/transactions/infra/models/Transaction';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const createTransaction = this.ormRepository.create(data);

    await this.ormRepository.save(createTransaction);

    return createTransaction;
  }

  public async save(data: Transaction): Promise<Transaction> {
    return this.ormRepository.save(data);
  }

  public async findByID(id: string): Promise<Transaction | undefined> {
    const foundTransaction = await this.ormRepository.findOne({ id });

    return foundTransaction;
  }

  public async all(): Promise<Transaction[]> {
    const foundTransactions = await this.ormRepository.find();

    return foundTransactions;
  }
}
