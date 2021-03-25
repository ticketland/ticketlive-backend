import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTransactionsUseCase from './ListTransactionsUseCase';

export default class ListTransactionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute();

    return response.json(transactions);
  }
}
