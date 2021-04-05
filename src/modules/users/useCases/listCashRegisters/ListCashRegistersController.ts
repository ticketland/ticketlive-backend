import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCashRegistersUseCase from './ListCashRegistersUseCase';

export default class ListCashRegistersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, state } = request.query;

    const listCashRegistersUseCase = container.resolve(
      ListCashRegistersUseCase,
    );

    const cashRegisters = await listCashRegistersUseCase.execute({
      user_id: user_id as string,
      state: state as string,
    });

    return response.json({ cashRegisters });
  }
}
