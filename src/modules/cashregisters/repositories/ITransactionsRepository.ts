// Dtos
import ICreateTransactionDTO from '@modules/cashregisters/dtos/ICreateTransactionDTO';

// Entities
import Transaction from '@modules/cashregisters/infra/entities/typeorm/Transaction';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(data: Transaction): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  all(): Promise<Transaction[]>;
}
