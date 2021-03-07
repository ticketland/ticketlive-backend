// Entities
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';

// Dtos
import ICreateCashRegisterDTO from '@modules/cashregisters/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/cashregisters/dtos/IFilterCashRegisterDTO';

export default interface ICashRegistersRepository {
  findByID(id: string): Promise<CashRegister | undefined>;
  all({ user_id, state }: IFilterCashRegisterDTO): Promise<CashRegister[]>;
  save(cashRegister: CashRegister): Promise<CashRegister>;
  create(data: ICreateCashRegisterDTO): Promise<CashRegister>;
}
