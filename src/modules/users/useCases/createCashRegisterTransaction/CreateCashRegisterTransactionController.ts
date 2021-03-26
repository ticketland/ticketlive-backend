import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCashRegisterTransactionUseCase from './CreateCashRegisterTransactionUseCase';

export default class CreateCashRegisterTransactionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { cash_register_id } = request.params;
    const { operation_id, value } = request.body;

    const createCashRegisterTransactionUseCase = container.resolve(
      CreateCashRegisterTransactionUseCase,
    );

    const transaction = await createCashRegisterTransactionUseCase.execute({
      user_id,
      cash_register_id,
      operation_id,
      value,
    });

    return response.json(transaction);
  }
}
