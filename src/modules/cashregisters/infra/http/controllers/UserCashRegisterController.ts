import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import ShowAllCashRegistersFromUserService from '@modules/cashregisters/services/ShowAllCashRegistersFromUserService';

export default class UserCashRegisterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const filters: string[] = request.query.filters as string[];

    const showCashRegistersFromUser = container.resolve(
      ShowAllCashRegistersFromUserService,
    );

    const cashRegisters = await showCashRegistersFromUser.execute({
      user_id,
      filters,
    });

    return response.json({ cashRegisters });
  }
}
