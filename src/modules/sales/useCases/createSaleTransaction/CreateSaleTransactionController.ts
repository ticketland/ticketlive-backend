import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSaleTransactionUseCase from './CreateSaleTransactionUseCase';

export default class CreateCashRegisterTransactionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { sale_id } = request.params;
    const { payments } = request.body;

    const createSaleTransactionUseCase = container.resolve(
      CreateSaleTransactionUseCase,
    );

    const transaction = await createSaleTransactionUseCase.execute({
      user_id,
      cash_register_id,
      operation_id,
      value,
    });

    return response.json(transaction);
  }
}
