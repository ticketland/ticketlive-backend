import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTransactionsUseCase from './ListTransactionsUseCase';

export default class ListTransactionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { cash_register_id } = request.query;

    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute({
      cash_register_id: cash_register_id as string,
    });

    return response.json(transactions);
  }
}
