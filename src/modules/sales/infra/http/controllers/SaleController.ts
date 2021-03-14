import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateSaleService from '@modules/sales/services/CreateSaleService';

// Services

export default class SaleController {
  // public async index(request: Request, response: Response): Promise<Response> {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { reservation_id, payment_method_id, participant_id } = request.body;

    const createSale = container.resolve(CreateSaleService);

    const sale = await createSale.execute({
      reservation_id,
      payment_method_id,
      participant_id,
      user_id,
    });

    return response.json(sale);
  }

  // public async show(request: Request, response: Response): Promise<Response> {}
}
