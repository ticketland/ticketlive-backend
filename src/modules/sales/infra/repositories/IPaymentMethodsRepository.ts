import ICreatePaymentMethodDTO from '@modules/sales/dtos/ICreatePaymentMethodDTO';
import PaymentMethod from '@modules/sales/infra/models/PaymentMethod';

export default interface IPaymentMethodsRepository {
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  save(data: PaymentMethod): Promise<PaymentMethod>;
  findByID(id: string): Promise<PaymentMethod | undefined>;
  all(): Promise<PaymentMethod[]>;
}
