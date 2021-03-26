import { getRepository, Repository } from 'typeorm';

import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import Sale from '@modules/sales/infra/models/Sale';

export default class EntranceRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create(saleData: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create(saleData);

    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    return this.ormRepository.save(sale);
  }

  public async findByID(id: string): Promise<Sale | undefined> {
    const foundSale = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['tickets'],
    });

    return foundSale;
  }

  public async all(): Promise<Sale[]> {
    const sales = await this.ormRepository.find();

    return sales;
  }
}
