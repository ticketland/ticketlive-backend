// Dtos
import ICreateCashRegisterDTO from '@modules/cashregisters/dtos/ICreateCashRegisterDTO';

// Entities
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';

export default interface ICashRegistersRepository {
  findByID(id: string): Promise<CashRegister | undefined>;
  all(): Promise<CashRegister[]>;
  findCashRegisterFromUser(
    user_id: string,
    filters: string[],
  ): Promise<CashRegister[]>;
  save(cashRegister: CashRegister): Promise<CashRegister>;
  create(data: ICreateCashRegisterDTO): Promise<CashRegister>;
}
