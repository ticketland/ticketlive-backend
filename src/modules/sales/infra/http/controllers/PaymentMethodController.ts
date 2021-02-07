import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ShowPaymentMethodsService from '@modules/sales/services/ShowPaymentMethodsService';
import CreatePaymentMethodService from '@modules/sales/services/CreatePaymentMethodService';
import ShowOnePaymentMethodService from '@modules/sales/services/ShowOnePaymentMethodService';

export default class PaymentMethodController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showPaymentMethods = container.resolve(ShowPaymentMethodsService);

    const paymentMethods = await showPaymentMethods.execute();

    return response.json({ paymentMethods });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { type } = request.body;

    const createPaymentMethod = container.resolve(CreatePaymentMethodService);

    const paymentMethod = await createPaymentMethod.execute({ type });

    return response.json({ paymentMethod });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { payment_method_id } = request.params;

    const showPaymentMethod = container.resolve(ShowOnePaymentMethodService);

    const paymentMethod = await showPaymentMethod.execute({
      payment_method_id,
    });

    return response.json({ paymentMethod });
  }
}
