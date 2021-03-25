import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionUseCase from './CreateTransactionUseCase';

export default class CreateTransactionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { cash_register_id, operation_id, value } = request.body;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase,
    );

    const transaction = await createTransactionUseCase.execute({
      user_id,
      cash_register_id,
      operation_id,
      value,
    });

    return response.json(transaction);
  }
}
