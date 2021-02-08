import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import ShowAllCashRegistersService from '@modules/cashregisters/services/ShowAllCashRegistersService';
import CreateCashRegisterService from '@modules/cashregisters/services/CreateCashRegisterService';
import UpdateCashRegisterService from '@modules/cashregisters/services/UpdateCashRegisterService';

export default class CashRegisterController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const filters: string[] = request.query.filters as string[];

    const showCashRegisters = container.resolve(ShowAllCashRegistersService);

    const cashRegisters = await showCashRegisters.execute();

    return response.json({ cashRegisters });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { open_value } = request.body;

    const createCashRegister = container.resolve(CreateCashRegisterService);

    const cashRegister = await createCashRegister.execute({
      user_id,
      open_value,
    });

    return response.json({ cashRegister });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // const filters: string[] = request.query.filters as string[];
    const { id: user_id } = request.user;
    const { cash_register_id } = request.params;
    const { close_value } = request.body;

    const updateCashRegister = container.resolve(UpdateCashRegisterService);

    const cashRegister = await updateCashRegister.execute({
      user_id,
      cash_register_id,
      close_value,
    });

    return response.json({ cashRegister });
  }
}
