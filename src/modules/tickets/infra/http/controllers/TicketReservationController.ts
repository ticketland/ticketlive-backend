import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import CreateTicketReserationService from '@modules/tickets/services/CreateTicketReservationService';
import ShowReservationService from '@modules/tickets/services/ShowReservationService';
import CancelReservationService from '@modules/tickets/services/CancelReservationService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const showReservation = container.resolve(ShowReservationService);

    const reservation = await showReservation.execute({
      reservation_id,
    });

    return response.json(reservation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { status } = request.body;

    const createTicketReservation = container.resolve(
      CreateTicketReserationService,
    );

    const reservation = await createTicketReservation.execute({
      user_id,
      tickets,
    });

    return response.json(reservation);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const cancelReservation = container.resolve(CancelReservationService);

    await cancelReservation.execute({
      reservation_id,
    });

    return response.status(204).json();
  }
}
