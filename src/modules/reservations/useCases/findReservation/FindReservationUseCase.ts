import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import Reservation from '@modules/reservations/infra/models/Reservation';

// Interfaces
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';

interface IRequest {
  reservation_id: string;
}

@injectable()
class FindReservationUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('ReservationsApiRepository')
    private reservationsApiRepository: IReservationsRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<Reservation> {
    const foundReservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );

    if (foundReservation.status === 'completed') return foundReservation;

    const {
      reservation_tickets,
    } = await this.reservationsApiRepository.findByIdOrFail(reservation_id);

    return {
      ...foundReservation,
      reservation_tickets,
    };
  }
}

export default FindReservationUseCase;
