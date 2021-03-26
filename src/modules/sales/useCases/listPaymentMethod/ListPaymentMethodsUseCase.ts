import { injectable, inject } from 'tsyringe';

import PaymentMethod from '@modules/sales/infra/models/PaymentMethod';
import IPaymentMethodsRepository from '@modules/sales/infra/repositories/IPaymentMethodsRepository';

@injectable()
class ListPaymentMethodsUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  public async execute(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.paymentMethodsRepository.all();

    return paymentMethods;
  }
}

export default ListPaymentMethodsUseCase;
