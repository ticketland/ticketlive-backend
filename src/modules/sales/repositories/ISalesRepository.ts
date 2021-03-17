// Dtos
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

// Entities
import Sale from '@modules/sales/infra/entities/typeorm/Sale';

export default interface ISalesRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  save(sale: Sale): Promise<Sale>;
  findByID(id: string): Promise<Sale | undefined>;
  all(): Promise<Sale[]>;
}
