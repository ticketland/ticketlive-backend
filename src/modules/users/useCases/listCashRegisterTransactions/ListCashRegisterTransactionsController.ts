import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCashRegisterTransactionsUseCase } from './ListCashRegisterTransactionsUseCase';

class ListCashRegisterTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cash_register_id } = request.params;

    const listCashRegisterTransactionsUseCase = container.resolve(
      ListCashRegisterTransactionsUseCase,
    );

    const transactions = await listCashRegisterTransactionsUseCase.execute({
      cash_register_id,
    });

    return response.json(transactions);
  }
}

export { ListCashRegisterTransactionsController };
