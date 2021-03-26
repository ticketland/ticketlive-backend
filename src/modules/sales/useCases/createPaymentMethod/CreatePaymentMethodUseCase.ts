import { injectable, inject } from 'tsyringe';

import PaymentMethod from '@modules/sales/infra/models/PaymentMethod';
import IPaymentMethodsRepository from '@modules/sales/infra/repositories/IPaymentMethodsRepository';

interface IRequest {
  type: string;
}

@injectable()
class CreatePaymentMethodUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  public async execute({ type }: IRequest): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodsRepository.create({
      type,
    });

    return paymentMethod;
  }
}

export default CreatePaymentMethodUseCase;
