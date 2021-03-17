import { injectable, inject } from 'tsyringe';

// Errors

// Models
import PaymentMethod from '@modules/sales/infra/entities/typeorm/PaymentMethod';
import NotFoundError from '@shared/errors/NotFoundError';
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
      throw new NotFoundError();
    }

    return paymentMethod;
  }
}

export default ShowOnePaymentMethodService;
