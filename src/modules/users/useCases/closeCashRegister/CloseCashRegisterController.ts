import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CloseCashRegisterUseCase from './CloseCashRegisterUseCase';

export default class CloseCashRegisterController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { cash_register_id } = request.params;
    const { closing_value } = request.body;

    const closeCashRegisterUseCase = container.resolve(
      CloseCashRegisterUseCase,
    );

    const cashRegister = await closeCashRegisterUseCase.execute({
      user_id,
      cash_register_id,
      closing_value,
    });

    return response.json({ cashRegister });
  }
}
