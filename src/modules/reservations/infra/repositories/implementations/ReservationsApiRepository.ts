import { inject, injectable } from 'tsyringe';

import ServerError from '@shared/container/providers/HttpProvider/errors/ServerError';
import ReservationAlreadyCompletedError from '@modules/reservations/errors/ReservationAlreadyCompletedError';
import ISendTicketsReservationDTO from '@modules/reservations/dtos/ISendTicketsReservationDTO';
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import Reservation from '@modules/reservations/infra/models/Reservation';
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';
import Ticket from '@modules/tickets/infra/models/Ticket';
import Event from '@modules/events/infra/models/Event';

interface ReservationResponse {
  id: string;
  ext_user_id: string;
  status: string;
  created_at: Date;
  reservation_ticket_types: {
    ticket_type_id: string;
    quantity: number;
    reservation_id: string;
    ticket_type: {
      id: string;
      ticket_tier_id: string;
      type: string;
      description: string;
      price_in_cents: number;
      available_tickets: number;
      reserved_tickets: number;
      sold_tickets: number;
    };
  }[];
}

@injectable()
export default class ReservationsApiRepository
  implements Partial<IReservationsRepository> {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) { }

  private toReservation(reservationResponse: ReservationResponse): Reservation {
    const {
      id,
      status,
      ext_user_id,
      reservation_ticket_types,
    } = reservationResponse;

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
    const response = await this.httpProvider
      .callAPI()
      .post<ReservationResponse>('/reservations/', {
        ext_user_id: user_id,
        tickets,
      });

    const reservation = this.toReservation(response.data);

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
      .get<ReservationResponse>(`/reservations/${reservation_id}`);

    const reservation = this.toReservation(response.data);

    return reservation;
  }
}
