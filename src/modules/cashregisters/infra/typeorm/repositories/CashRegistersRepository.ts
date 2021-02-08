import { Brackets, getRepository, Repository } from 'typeorm';

// Repositories
import ICashRegistersRepository from '@modules/cashregisters/repositories/ICashRegistersRepository';

// Interfaces
import ICreateCashRegisterDTO from '@modules/cashregisters/dtos/ICreateCashRegisterDTO';

// Models
import CashRegister from '../entities/CashRegister';

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

  public async findCashRegisterFromUser(
    user_id: string,
    filters: string[],
  ): Promise<CashRegister[]> {
    const foundCashRegister = await this.ormRepository
      .createQueryBuilder('cashregister')
      .innerJoin('cashregister.user', 'user')
      .where(
        new Brackets(qb => {
          qb.where('user.id = :user_id', { user_id });
          if (filters) {
            filters.forEach(filter => {
              switch (filter) {
                case 'closed':
                  qb.andWhere('cashregister.closed_at is not null');
                  break;
                default:
                  qb.andWhere('cashregister.closed_at is null');
                  break;
              }
            });
          }
        }),
      )
      .getMany();

    return foundCashRegister;
  }

  public async all(): Promise<CashRegister[]> {
    const cashRegisters = await this.ormRepository.find();

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
