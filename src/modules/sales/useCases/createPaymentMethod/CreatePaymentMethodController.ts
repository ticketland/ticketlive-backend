import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePaymentMethodUseCase from './CreatePaymentMethodUseCase';

export default class CreatePaymentMethodController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.body;

    const createPaymentMethodUseCase = container.resolve(
      CreatePaymentMethodUseCase,
    );

    const paymentMethod = await createPaymentMethodUseCase.execute({ type });

    return response.json(paymentMethod);
  }
}
