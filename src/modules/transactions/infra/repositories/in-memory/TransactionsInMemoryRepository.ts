import { v4 as uuid } from 'uuid';

import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';

class TransactionsInMemoryRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const createTransaction = new Transaction();

    Object.assign(createTransaction, {
      id: uuid(),
      cash_register_id: data.cash_register_id,
      operation_id: data.operation_id,
      value: data.value,
      user_id: data.user_id,
      sale_id: data.sale_id,
      payment_method_id: data.payment_method_id,
    });

    this.transactions.push(createTransaction);

    return createTransaction;
  }

  public async save(data: Transaction): Promise<Transaction> {
    const findIndex = this.transactions.findIndex(
      (findTransaction) => findTransaction.id === data.id,
    );

    this.transactions[findIndex] = data;

    return data;
  }

  public async findByID(id: string): Promise<Transaction | undefined> {
    const foundTransaction = this.transactions.find(
      (transaction) => transaction.id === id,
    );

    return foundTransaction;
  }

  public async findByCashRegisterID(
    cash_register_id: string,
  ): Promise<Transaction[]> {
    const foundTransaction = this.transactions.filter(
      (transaction) => transaction.cash_register_id === cash_register_id,
    );

    return foundTransaction;
  }

  public async all(): Promise<Transaction[]> {
    return this.transactions;
  }
}

export { TransactionsInMemoryRepository };
