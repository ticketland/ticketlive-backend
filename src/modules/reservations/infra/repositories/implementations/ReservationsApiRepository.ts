import { inject, injectable } from 'tsyringe';

// Errors
import ServerError from '@shared/container/providers/HttpProvider/errors/ServerError';
import ReservationAlreadyCompletedError from '@modules/reservations/errors/ReservationAlreadyCompletedError';

// DTOs
import ISendTicketsReservationDTO from '@modules/reservations/dtos/ISendTicketsReservationDTO';

// Repositories
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';

// Models
import Reservation from '@modules/reservations/infra/models/Reservation';

import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';
import { AxiosResponse } from 'axios';

@injectable()
export default class ReservationsApiRepository
  implements Partial<IReservationsRepository> {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toReservation(response: any): Reservation {
    const { id, status, ext_user_id, reservation_ticket_types } = response.data;

    const reservation = Object.assign(new Reservation(), {
      id,
      user_id: ext_user_id,
      status,
      reservation_tickets: reservation_ticket_types,
    });

    return reservation;
  }

  public async create({
    user_id,
    tickets,
  }: ISendTicketsReservationDTO): Promise<Reservation> {
    const response = await this.httpProvider.callAPI().post('/reservations/', {
      ext_user_id: user_id,
      tickets,
    });

    const reservation = this.toReservation(response);

    return reservation;
  }

  public async cancel(reservation_id: string): Promise<void> {
    await this.httpProvider
      .callAPI()
      .patch(`/reservations/${reservation_id}/cancel`);
  }

  public async findByIdOrFail(reservation_id: string): Promise<Reservation> {
    const response = await this.httpProvider
      .callAPI()
      .get(`/reservations/${reservation_id}`);

    const reservation = this.toReservation(response);

    return reservation;
  }

  public async generateTickets(reservation_id: string): Promise<Ticket[]> {
    try {
      const response = await this.httpProvider
        .callAPI()
        .post(`/reservations/${reservation_id}/tickets`);

      return response.data;
    } catch (error) {
      switch (error.response.status) {
        case 403:
          throw new ReservationAlreadyCompletedError();
        default:
          throw new ServerError();
      }
    }
  }
}
