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
    reservation: TicketReservation,
  ): Promise<string> {
    try {
      const reservation = await axios.post(
        'http://localhost:3334/api/reservations/',
        {
          reservation,
        },
      );
     
      return reservation.data;
    } catch (err) {

      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async sendReservationCompleteRequest(
    reservation_id: string,
  ): Promise<Ticket[]> {
    try {
      
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }
}
