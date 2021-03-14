import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import Reservation from '@modules/reservations/infra/entities/typeorm/Reservation';

// Interfaces
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';

interface IRequest {
  reservation_id: string;
}

@injectable()
class ShowReservationService {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<Reservation> {
    const foundReservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );

    if (foundReservation.status === 'complete') return foundReservation;

    const fetchReservation = await this.reservationsRepository.fetchReservation(
      reservation_id,
    );

    return {
      ...foundReservation,
      reservationTickets: fetchReservation.reservationTickets,
    };
  }
}

export default ShowReservationService;
