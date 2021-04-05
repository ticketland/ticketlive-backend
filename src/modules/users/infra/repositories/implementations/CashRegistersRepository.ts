import { getRepository, Repository } from 'typeorm';

import Transaction from '@modules/transactions/infra/models/Transaction';
import ICreateCashRegisterDTO from '@modules/users/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/users/dtos/IFilterCashRegisterDTO';
import CashRegister from '@modules/users/infra/models/CashRegister';
import NotFoundError from '@shared/errors/NotFoundError';

import ICashRegistersRepository from '../ICashRegistersRepository';

export default class CashRegistersRepository
  implements ICashRegistersRepository {
  private ormRepository: Repository<CashRegister>;

  constructor() {
    this.ormRepository = getRepository(CashRegister);
  }

  public async findByID(id: string): Promise<CashRegister | undefined> {
    const foundCashRegister = await this.ormRepository.findOne({
      id,
    });

    return foundCashRegister;
  }

  public async loadTransactions(
    cashRegister: CashRegister,
  ): Promise<Transaction[]> {
    const cashRegisterWithTransactions = await this.ormRepository
      .createQueryBuilder('cashregister')
      .where('cashregister.id = :id', { id: cashRegister.id })
      .leftJoin('cashregister.transactions', 'transactions')
      .addSelect([
        'transactions.value',
        'transactions.sale_id',
        'transactions.payment_method_id',
      ])
      .leftJoin('transactions.operation', 'operation')
      .addSelect('operation.type')
      .getOne();

    return cashRegisterWithTransactions?.transactions || [];
  }

  public async all({
    user_id,
    state,
  }: IFilterCashRegisterDTO): Promise<CashRegister[]> {
    const cashRegistersQuery = await this.ormRepository
      .createQueryBuilder('cashregister')
      .innerJoin('cashregister.user', 'user');

    if (user_id) cashRegistersQuery.andWhere('user.id = :user_id', { user_id });

    if (state && state === 'closed')
      cashRegistersQuery.andWhere('cashregister.closed_at is not null');
    else if (state && state === 'opened')
      cashRegistersQuery.andWhere('cashregister.closed_at is null');

    const cashRegisters = await cashRegistersQuery.getMany();

    return cashRegisters;
  }

  public async save(cashRegister: CashRegister): Promise<CashRegister> {
    return this.ormRepository.save(cashRegister);
  }

  public async create(data: ICreateCashRegisterDTO): Promise<CashRegister> {
    const createCashRegister = this.ormRepository.create(data);

    await this.ormRepository.save(createCashRegister);

    return createCashRegister;
  }
}
