import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

// Errors
import UnavailableTicketError from '@modules/reservations/errors/UnavailableTicketError';
import InvalidTicketError from '@modules/reservations/errors/InvalidTicketError';
import ServerError from '@shared/container/providers/HttpProvider/errors/ServerError';

// DTOs
import ISendTicketsReservationDTO from '@modules/reservations/dtos/ISendTicketsReservationDTO';
import ICreateReservationDTO from '@modules/reservations/dtos/ICreateReservationDTO';

// Repositories
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';

// Models
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import Reservation from '@modules/reservations/infra/entities/typeorm/Reservation';

import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';
import NotFoundError from '@shared/errors/NotFoundError';

@injectable()
export default class ReservationsRepository implements IReservationsRepository {
  private ormRepository: Repository<Reservation>;

  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {
    this.ormRepository = getRepository(Reservation);
  }

  public async sendResevationRequest({
    user_id,
    tickets,
  }: ISendTicketsReservationDTO): Promise<string> {
    try {
      const reservationResponse = await this.httpProvider
        .callAPI()
        .post('/reservations/', {
          user_id,
          tickets,
        });

      return reservationResponse.data.reservation_id;
    } catch (err) {
      switch (err.response.data.error_code) {
        case 'tickets_unavailable':
          throw new UnavailableTicketError(
            undefined,
            undefined,
            err.response.data.tickets,
          );
        case 'tickets_notvalid':
          throw new InvalidTicketError();
        default:
          throw new ServerError();
      }
    }
  }

  public async sendCancelReservationRequest(
    reservation_id: string,
  ): Promise<number> {
    const cancelReservation = await this.httpProvider
      .callAPI()
      .delete(`/reservations/${reservation_id}`);

    return cancelReservation.status;
  }

  public async fetchReservation(reservation_id: string): Promise<Reservation> {
    const fetchReservation = await this.httpProvider
      .callAPI()
      .get(`/reservations/${reservation_id}`);

    return fetchReservation.data;
  }

  public async sendReservationCompleteRequest(
    reservation_id: string,
  ): Promise<Ticket[]> {
    const completeReservation = await this.httpProvider
      .callAPI()
      .put(`/reservations/${reservation_id}`, {
        status: 'completed',
      });

    return completeReservation.data.tickets;
  }

  public async create(data: ICreateReservationDTO): Promise<Reservation> {
    const reservation = this.ormRepository.create(data);

    await this.ormRepository.save(reservation);

    return reservation;
  }

  public async findByIdOrFail(reservation_id: string): Promise<Reservation> {
    const foundReservation = await this.ormRepository.findOne({
      id: reservation_id,
    });

    if (!foundReservation) throw new NotFoundError();

    return foundReservation;
  }
}
