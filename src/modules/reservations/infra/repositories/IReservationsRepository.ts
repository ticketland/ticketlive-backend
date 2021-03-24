import Reservation from '@modules/reservations/infra/models/Reservation';

// DTOs
import ISendTicketsReservationDTO from '@modules/reservations/dtos/ISendTicketsReservationDTO';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';

export default interface IReservationsRepository {
  create(data: ISendTicketsReservationDTO): Promise<Reservation>;
  findByIdOrFail(reservation_id: string): Promise<Reservation>;
  save(reservation: Reservation): Promise<Reservation>;
  cancel(reservation_id: string): Promise<void>;
  generateTickets(reservation_id: string): Promise<Ticket[]>;
}
