import { injectable, inject } from 'tsyringe';

// Interfaces
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  reservation_id: string;
}

@injectable()
class CancelReservationUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('ReservationsApiRepository')
    private reservationsApiRepository: IReservationsRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<void> {
    const findReservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );
    if (findReservation.status !== 'waiting')
      throw new AppError('This reservation can not be cancelled!', 400);

    await this.reservationsApiRepository.cancel(reservation_id);

    Object.assign(findReservation, { status: 'canceled' });

    await this.reservationsRepository.save(findReservation);
  }
}

export default CancelReservationUseCase;
