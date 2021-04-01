import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllCashRegistersUseCase from './FindAllCashRegistersUseCase';

export default class FindAllCashRegistersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, state } = request.query;

    const findAllCashRegistersUseCase = container.resolve(
      FindAllCashRegistersUseCase,
    );

    const cashRegisters = await findAllCashRegistersUseCase.execute({
      user_id: user_id as string,
      state: state as string,
    });

    return response.json({ cashRegisters });
  }
}
