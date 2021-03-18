import { Brackets, getRepository, Repository } from 'typeorm';

// DTOs
import ICreateCashRegisterDTO from '@modules/users/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/users/dtos/IFilterCashRegisterDTO';

// Models
import CashRegister from '@modules/users/infra/models/CashRegister';

// Interfaces
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

  public async all({
    user_id,
    state,
  }: IFilterCashRegisterDTO): Promise<CashRegister[]> {
    const cashRegisters = await this.ormRepository
      .createQueryBuilder('cashregister')
      .innerJoin('cashregister.user', 'user')
      .where(
        new Brackets(qb => {
          if (user_id) qb.where('user.id = :user_id', { user_id });
          if (state === 'closed')
            qb.andWhere('cashregister.closed_at is not null');
          else qb.andWhere('cashregister.closed_at is null');
        }),
      )
      .getMany();

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
