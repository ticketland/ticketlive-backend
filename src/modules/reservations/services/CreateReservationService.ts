import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import Reservation from '@modules/reservations/infra/entities/typeorm/Reservation';

// Interfaces
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';

interface IRequest {
  user_id: string;
  tickets: {
    id: number;
    quantity: number;
  }[];
}

@injectable()
class CreateReservationService {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,
  ) {}

  public async execute({ user_id, tickets }: IRequest): Promise<Reservation> {
    const reservationID = await this.reservationsRepository.sendResevationRequest(
      { user_id, tickets },
    );

    const reservation = await this.reservationsRepository.create({
      user_id,
      id: reservationID,
      status: 'waiting',
    });

    return reservation;
  }
}

export default CreateReservationService;
