// Dtos
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

// Entities
import Transaction from '@modules/transactions/infra/models/Transaction';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(data: Transaction): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  all(): Promise<Transaction[]>;
}
