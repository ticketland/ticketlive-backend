import { v4 as uuid } from 'uuid';

import Transaction from '@modules/transactions/infra/models/Transaction';
import ICreateCashRegisterDTO from '@modules/users/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/users/dtos/IFilterCashRegisterDTO';

import CashRegister from '../../models/CashRegister';
import ICashRegistersRepository from '../ICashRegistersRepository';

class CashRegistersInMemoryRepository implements ICashRegistersRepository {
  cashRegisters: CashRegister[] = [];

  async findByID(id: string): Promise<CashRegister | undefined> {
    const findCashRegister = this.cashRegisters.find(
      (cash_register) => cash_register.id === id,
    );

    return findCashRegister;
  }

  async loadTransactions(cashRegister: CashRegister): Promise<Transaction[]> {
    const findCashRegister = this.cashRegisters.find(
      (cash_register) => cash_register.id === cashRegister.id,
    );

    return findCashRegister?.transactions || [];
  }

  async all({
    user_id,
    state,
  }: IFilterCashRegisterDTO): Promise<CashRegister[]> {
    const all = this.cashRegisters.filter((cr) => {
      if (
        (user_id && cr.user_id === user_id) ||
        (state === 'closed' && cr.closed_at !== null)
      )
        return cr;
      return null;
    });

    return all;
  }

  async save(cashRegister: CashRegister): Promise<CashRegister> {
    const findIndex = this.cashRegisters.findIndex(
      (findCashRegister) => findCashRegister.id === cashRegister.id,
    );

    this.cashRegisters[findIndex] = cashRegister;

    return cashRegister;
  }

  async create(data: ICreateCashRegisterDTO): Promise<CashRegister> {
    const cashRegister = new CashRegister();

    Object.assign(cashRegister, {
      id: uuid(),
      user_id: data.user_id,
      opening_balance: data.opening_balance,
      current_balance: data.opening_balance,
    });

    this.cashRegisters.push(cashRegister);

    return cashRegister;
  }
}

export { CashRegistersInMemoryRepository };
