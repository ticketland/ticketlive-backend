import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

// Interfaces
import IPaymentMethodsRepository from '../repositories/IPaymentMethodsRepository';

interface IRequest {
  type: string;
}

@injectable()
class CreatePaymentMethodService {
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

export default CreatePaymentMethodService;
