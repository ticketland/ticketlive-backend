import TicketReservation from '@modules/tickets/infra/typeorm/entities/TicketReservation';
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

export default interface ITicketsReservationRepository {
  sendResevationRequest(reservation: TicketReservation): Promise<string>;
  sendReservationCompleteRequest(reservation_id: string): Promise<Ticket[]>;
}
