import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import ISendTicketsReservationDTO from '../dtos/ISendTicketsReservationDTO';

export default interface ITicketsReservationRepository {
  sendResevationRequest(
    reservation: ISendTicketsReservationDTO,
  ): Promise<string>;
  sendReservationCompleteRequest(reservation_id: string): Promise<Ticket[]>;
  fetchReservation(reservation_id: string): Promise<any>;
  sendCancelReservationRequest(reservation_id: string): Promise<any>;
}
