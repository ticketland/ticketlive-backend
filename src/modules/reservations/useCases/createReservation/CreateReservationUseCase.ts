import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import Reservation from '@modules/reservations/infra/models/Reservation';

// Interfaces
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';

interface IRequest {
  user_id: string;
  tickets: {
    ticket_type_id: number;
    quantity: number;
  }[];
}

@injectable()
class CreateReservationUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('ReservationsApiRepository')
    private reservationsApiRepository: IReservationsRepository,
  ) {}

  public async execute({ user_id, tickets }: IRequest): Promise<Reservation> {
    const reservation = await this.reservationsApiRepository.create({
      user_id,
      tickets,
    });

    await this.reservationsRepository.save(reservation);

    return reservation;
  }
}

export default CreateReservationUseCase;
