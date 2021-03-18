// Entities
import CashRegister from '@modules/users/infra/models/CashRegister';

// Dtos
import ICreateCashRegisterDTO from '@modules/users/dtos/ICreateCashRegisterDTO';
import IFilterCashRegisterDTO from '@modules/users/dtos/IFilterCashRegisterDTO';

export default interface ICashRegistersRepository {
  findByID(id: string): Promise<CashRegister | undefined>;
  all({ user_id, state }: IFilterCashRegisterDTO): Promise<CashRegister[]>;
  save(cashRegister: CashRegister): Promise<CashRegister>;
  create(data: ICreateCashRegisterDTO): Promise<CashRegister>;
}
