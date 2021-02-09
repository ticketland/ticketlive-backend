import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import CreateTicketReserationService from '@modules/tickets/services/CreateTicketReservationService';

export default class TicketReservationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { tickets } = request.body;

    const createTicketReservation = container.resolve(
      CreateTicketReserationService,
    );

    const reservation = await createTicketReservation.execute({
      user_id,
      tickets,
    });

    return response.json(reservation);
  }
}
