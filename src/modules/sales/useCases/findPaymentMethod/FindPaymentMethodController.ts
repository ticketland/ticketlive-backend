import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindPaymentMethodUseCase from './FindPaymentMethodUseCase';

export default class FindPaymentMethodController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { payment_method_id } = request.params;

    const findPaymentMethodUseCase = container.resolve(
      FindPaymentMethodUseCase,
    );

    const paymentMethod = await findPaymentMethodUseCase.execute({
      payment_method_id,
    });

    return response.json(paymentMethod);
  }
}
