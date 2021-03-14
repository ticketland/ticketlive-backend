import { injectable, inject } from 'tsyringe';

// Interfaces
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';

interface IRequest {
  reservation_id: string;
}

@injectable()
class CancelReservationService {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<boolean> {
    await this.reservationsRepository.sendCancelReservationRequest(
      reservation_id,
    );

    return true;
  }
}

export default CancelReservationService;
