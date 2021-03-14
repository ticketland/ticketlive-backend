import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import CreateReservationService from '@modules/reservations/services/CreateReservationService';
import ShowReservationService from '@modules/reservations/services/ShowReservationService';
import CancelReservationService from '@modules/reservations/services/CancelReservationService';

export default class ReservationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { tickets } = request.body;

    const createReservation = container.resolve(CreateReservationService);

    const reservation = await createReservation.execute({
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const cancelReservation = container.resolve(CancelReservationService);

    await cancelReservation.execute({
      reservation_id,
    });

    return response.status(204).json();
  }
}
