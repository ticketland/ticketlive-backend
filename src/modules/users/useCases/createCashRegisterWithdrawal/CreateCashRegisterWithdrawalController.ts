import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCashRegisterWithdrawalUseCase } from './CreateCashRegisterWithdrawalUseCase';

class CreateCashRegisterWithdrawalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { cash_register_id } = request.params;
    const { value } = request.body;

    const createCashRegisterWithdrawalUseCase = container.resolve(
      CreateCashRegisterWithdrawalUseCase,
    );

    const withdrawal = await createCashRegisterWithdrawalUseCase.execute({
      user_id,
      cash_register_id,
      value,
    });

    return response.json(withdrawal);
  }
}

export { CreateCashRegisterWithdrawalController };
