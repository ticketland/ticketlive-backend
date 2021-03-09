import axios from 'axios';

// Errors
import AppError from '@shared/errors/AppError';
import TicketNotAvailableError from '@modules/tickets/errors/TicketNotAvailableError';
import TicketNotValidError from '@modules/tickets/errors/TicketNotValidError';

// DTOs
import ISendTicketsReservationDTO from '@modules/tickets/dtos/ISendTicketsReservationDTO';

// Repositories
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

// Models
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

// Interfaces

export default class TicketsReservationRepository
  implements ITicketsReservationRepository {
  public async sendResevationRequest(
    reservationRequest: ISendTicketsReservationDTO,
  ): Promise<string> {
    try {
      const reservationResponse = await axios.post(
        'http://localhost:3334/api/reservations/',
        {
          reservationRequest,
        },
      );

      return reservationResponse.data;
    } catch (err) {
      if (err.response.data.error_code === 'tickets_unavailable')
        throw new TicketNotAvailableError(
          undefined,
          undefined,
          err.response.data.tickets,
        );

      if (err.response.data.error_code === 'tickets_notvalid')
        throw new TicketNotValidError();

      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async sendCancelReservationRequest(
    reservation_id: string,
  ): Promise<any> {
    try {
      const cancelReservation = await axios.delete(
        `http://localhost:3334/api/reservations/${reservation_id}`,
      );

      return cancelReservation.status;
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async fetchReservation(reservation_id: string): Promise<any> {
    try {
      const fetchReservation = await axios.get(
        `http://localhost:3334/api/reservations/${reservation_id}`,
      );

      return fetchReservation.data;
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async sendReservationCompleteRequest(
    reservation_id: string,
  ): Promise<Ticket[]> {
    try {
      const completeReservation = await axios.put(
        `http://localhost:3334/api/reservations/${reservation_id}`,
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
