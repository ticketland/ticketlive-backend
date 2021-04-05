import Transaction from '@modules/transactions/infra/models/Transaction';
import ICreateCashRegisterDTO from '@modules/users/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/users/dtos/IFilterCashRegisterDTO';
import CashRegister from '@modules/users/infra/models/CashRegister';

export default interface ICashRegistersRepository {
  findByID(id: string): Promise<CashRegister | undefined>;
  loadTransactions(cashRegister: CashRegister): Promise<Transaction[]>;
  all({ user_id, state }: IFilterCashRegisterDTO): Promise<CashRegister[]>;
  save(cashRegister: CashRegister): Promise<CashRegister>;
  create(data: ICreateCashRegisterDTO): Promise<CashRegister>;
}
