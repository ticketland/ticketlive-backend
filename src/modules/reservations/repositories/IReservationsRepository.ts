import Reservation from '@modules/reservations/infra/entities/typeorm/Reservation';
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

// DTOs
import ISendTicketsReservationDTO from '../dtos/ISendTicketsReservationDTO';
import ICreateReservationDTO from '../dtos/ICreateReservationDTO';

export default interface IReservationsRepository {
  sendResevationRequest(
    reservation: ISendTicketsReservationDTO,
  ): Promise<string>;
  sendReservationCompleteRequest(reservation_id: string): Promise<Ticket[]>;
  fetchReservation(reservation_id: string): Promise<Reservation>;
  sendCancelReservationRequest(reservation_id: string): Promise<number>;

  create(data: ICreateReservationDTO): Promise<Reservation>;
  findByIdOrFail(reservation_id: string): Promise<Reservation>;
}
