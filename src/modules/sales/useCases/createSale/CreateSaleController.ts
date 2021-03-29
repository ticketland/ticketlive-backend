import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSaleUseCase from './CreateSaleUseCase';

export default class CreateSaleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { opened_cash_register_id: cash_register_id } = request.cashRegister
    const { reservation_id, payments } = request.body;

    const createSaleUseCase = container.resolve(CreateSaleUseCase);

    const sale = await createSaleUseCase.execute({
      user_id,
      cash_register_id,
      reservation_id,
      payments,
    });

    return response.json(sale);
  }
}
