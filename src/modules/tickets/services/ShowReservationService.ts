import { injectable, inject } from 'tsyringe';

// Errors

// Entities

// Interfaces
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

interface IRequest {
  reservation_id: string;
}

@injectable()
class ShowReservationService {
  constructor(
    @inject('TicketsReservationRepository')
    private ticketsReservationRepository: ITicketsReservationRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<any> {
    const reservation = await this.ticketsReservationRepository.fetchReservation(
      reservation_id,
    );

    return reservation;
  }
}

export default ShowReservationService;
