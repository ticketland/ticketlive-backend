import { Request, Response } from 'express';
import { container } from 'tsyringe';
import queryParams from 'query-string';

import FindAllCashRegistersUseCase from './FindAllCashRegistersUseCase';

export default class FindAllCashRegistersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, state } = queryParams.parseUrl(request.originalUrl).query;

    const findAllCashRegistersUseCase = container.resolve(
      FindAllCashRegistersUseCase,
    );

    const cashRegisters = await findAllCashRegistersUseCase.execute({
      user_id,
      state,
    });

    return response.json({ cashRegisters });
  }
}
