// Dtos
import ICreatePaymentMethodDTO from '@modules/sales/dtos/ICreatePaymentMethodDTO';

// Entities
import PaymentMethod from '@modules/sales/infra/entities/typeorm/PaymentMethod';

export default interface IPaymentMethodsRepository {
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  save(data: PaymentMethod): Promise<PaymentMethod>;
  findByID(id: string): Promise<PaymentMethod | undefined>;
  all(): Promise<PaymentMethod[]>;
}
