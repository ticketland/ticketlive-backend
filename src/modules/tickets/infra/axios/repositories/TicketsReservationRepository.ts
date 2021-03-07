import axios from 'axios';

// Errors
import AppError from '@shared/errors/AppError';

// Repositories
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

// Models
import TicketReservation from '@modules/tickets/infra/typeorm/entities/TicketReservation';
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

// Interfaces

export default class TicketsReservationRepository
  implements ITicketsReservationRepository {
  public async sendResevationRequest(
    reservationRequest: TicketReservation,
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
