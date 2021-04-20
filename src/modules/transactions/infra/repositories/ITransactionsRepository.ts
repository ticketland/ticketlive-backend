import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '@modules/transactions/infra/models/Transaction';

export default interface ITransactionsRepository {
  create({
    cash_register_id,
    sale_id,
    operation_id,
    value,
    user_id,
  }: ICreateTransactionDTO): Promise<Transaction>;
  save(data: Transaction): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  findByCashRegisterID(cash_register_id: string): Promise<Transaction[]>;
  all(): Promise<Transaction[]>;
}
