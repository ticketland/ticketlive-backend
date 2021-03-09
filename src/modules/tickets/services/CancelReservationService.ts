import { injectable, inject } from 'tsyringe';

// Errors

// Entities

// Interfaces
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

interface IRequest {
  reservation_id: string;
}

@injectable()
class CancelReservationService {
  constructor(
    @inject('TicketsReservationRepository')
    private ticketsReservationRepository: ITicketsReservationRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<any> {
    const cancelReservation = await this.ticketsReservationRepository.sendCancelReservationRequest(
      reservation_id,
    );

    return cancelReservation;
  }
}

export default CancelReservationService;
