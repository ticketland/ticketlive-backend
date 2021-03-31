import Reservation from '@modules/reservations/infra/models/Reservation';

// DTOs
import ISendTicketsReservationDTO from '@modules/reservations/dtos/ISendTicketsReservationDTO';

export default interface IReservationsRepository {
  create(data: ISendTicketsReservationDTO): Promise<Reservation>;
  findByIdOrFail(reservation_id: string): Promise<Reservation>;
  save(reservation: Reservation): Promise<Reservation>;
  cancel(reservation_id: string): Promise<void>;
}
