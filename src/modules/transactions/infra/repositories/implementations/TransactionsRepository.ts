import { getRepository, Repository } from 'typeorm';

import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const createTransaction = this.ormRepository.create(data);

    return createTransaction;
  }

  public async save(data: Transaction): Promise<Transaction> {
    return this.ormRepository.save(data);
  }

  public async findByID(id: string): Promise<Transaction | undefined> {
    const foundTransaction = await this.ormRepository.findOne({ id });

    return foundTransaction;
  }

  public async findByCashRegisterID(
    cash_register_id: string,
  ): Promise<Transaction[]> {
    const foundTransactions = await this.ormRepository.find({
      where: {
        cash_register_id,
      },
      relations: ['operation'],
    });

    return foundTransactions;
  }

  public async all(): Promise<Transaction[]> {
    const foundTransactions = await this.ormRepository.find({
      relations: ['operation'],
    });

    return foundTransactions;
  }
}
