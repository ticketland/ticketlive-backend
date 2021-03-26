import { injectable, inject } from 'tsyringe';

import NotFoundError from '@shared/errors/NotFoundError';
import PaymentMethod from '@modules/sales/infra/models/PaymentMethod';
import IPaymentMethodsRepository from '@modules/sales/infra/repositories/IPaymentMethodsRepository';

interface IRequest {
  payment_method_id: string;
}

@injectable()
class FindPaymentMethodUseCase {
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
    if (!paymentMethod) throw new NotFoundError();

    return paymentMethod;
  }
}

export default FindPaymentMethodUseCase;
