import { getRepository, Repository } from 'typeorm';

// Repositories
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';

// Interfaces
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

// Models
import Sale from '../entities/Sale';

export default class EntranceRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create(saleData: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create(saleData);

    await this.ormRepository.save(sale);

    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    return this.ormRepository.save(sale);
  }

  public async findByID(id: string): Promise<Sale | undefined> {
    const foundSale = await this.ormRepository.findOne(id);

    return foundSale;
  }

  public async all(): Promise<Sale[]> {
    const sales = await this.ormRepository.find();

    return sales;
  }
}
