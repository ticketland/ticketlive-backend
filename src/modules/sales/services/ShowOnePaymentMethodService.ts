import { injectable, inject } from 'tsyringe';

// Errors
import PaymentMethodNotFound from '@modules/sales/errors/PaymentMethodNotFound';

// Models
import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';

interface IRequest {
  payment_method_id: string;
}

@injectable()
class ShowOnePaymentMethodService {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  public async execute({
    payment_method_id,
  }: IRequest): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodsRepository.findByID(
      payment_method_id,
    );

    if (!paymentMethod) {
      throw new PaymentMethodNotFound();
    }

    return paymentMethod;
  }
}

export default ShowOnePaymentMethodService;