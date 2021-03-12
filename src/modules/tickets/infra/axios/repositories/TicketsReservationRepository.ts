import axios, { AxiosInstance } from 'axios';

// Errors
import AppError from '@shared/errors/AppError';
import UnavailableTicketError from '@modules/tickets/errors/UnavailableTicketError';
import InvalidTicketError from '@modules/tickets/errors/InvalidTicketError';

// DTOs
import ISendTicketsReservationDTO from '@modules/tickets/dtos/ISendTicketsReservationDTO';

// Repositories
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

// Models
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

// Config
import ticketlandConfig from '@config/ticketland';
import NotFoundError from '@shared/errors/NotFoundError';

export default class TicketsReservationRepository
  implements ITicketsReservationRepository {
  private ticketlandAPI: AxiosInstance;

  constructor() {
    this.ticketlandAPI = axios.create({
      baseURL: ticketlandConfig.api.url,
    });
  }

  public async sendResevationRequest(
    reservationRequest: ISendTicketsReservationDTO,
  ): Promise<string> {
    try {
      const reservationResponse = await this.ticketlandAPI.post(
        '/reservations/',
        {
          reservationRequest,
        },
      );

      return reservationResponse.data;
    } catch (err) {
      if (err.response.data.error_code === 'tickets_unavailable')
        throw new UnavailableTicketError(
          undefined,
          undefined,
          err.response.data.tickets,
        );

      if (err.response.data.error_code === 'tickets_notvalid')
        throw new InvalidTicketError();

      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async sendCancelReservationRequest(
    reservation_id: string,
  ): Promise<any> {
    try {
      const cancelReservation = await this.ticketlandAPI.delete(
        `/reservations/${reservation_id}`,
      );

      return cancelReservation.status;
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async fetchReservation(reservation_id: string): Promise<any> {
    try {
      const fetchReservation = await this.ticketlandAPI.get(
        `/reservations/${reservation_id}`,
      );

      return fetchReservation.data;
    } catch (err) {
      if (err.response.status === 404) throw new NotFoundError();
      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async sendReservationCompleteRequest(
    reservation_id: string,
  ): Promise<Ticket[]> {
    try {
      const completeReservation = await axios.put(
        `/reservations/${reservation_id}`,
        {
          status: 'completed',
        },
      );

      return completeReservation.data.tickets;
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }
}
