import { inject, injectable } from 'tsyringe';

import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import Ticket from '@modules/tickets/infra/models/Ticket';
import AppError from '@shared/errors/AppError';

interface IRequest {
  reservation_id: string;
}

@injectable()
export default class GenerateTicketsUseCase {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,

    @inject('ReservationsApiRepository')
    private reservationsApiRepository: IReservationsRepository,
  ) {}

  public async execute({ reservation_id }: IRequest): Promise<Ticket[]> {
    const findReservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );
    if (findReservation.status !== 'waiting')
      throw new AppError('Invalid reservation', 400);

    const tickets = await this.reservationsApiRepository.generateTickets(
      reservation_id,
    );

    Object.assign(findReservation, {
      status: 'completed',
    });

    await this.reservationsRepository.save(findReservation);

    return tickets;
  }
}
