import { injectable, inject } from 'tsyringe';

// Models
import PaymentMethod from '@modules/sales/infra/entities/typeorm/PaymentMethod';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';

@injectable()
class ShowPaymentMethodsService {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  public async execute(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.paymentMethodsRepository.all();

    return paymentMethods;
  }
}

export default ShowPaymentMethodsService;
