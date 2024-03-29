import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCashRegisterUseCase from './CreateCashRegisterUseCase';

export default class CreateCashRegisterController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { opening_balance } = request.body;

    const createCashRegisterUseCase = container.resolve(
      CreateCashRegisterUseCase,
    );

    const cashRegister = await createCashRegisterUseCase.execute({
      user_id,
      opening_balance,
    });

    return response.json({ cashRegister });
  }
}
