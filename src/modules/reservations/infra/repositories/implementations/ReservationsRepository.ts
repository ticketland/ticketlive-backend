import { getRepository, Repository } from 'typeorm';

// DTOs
import ICreateReservationDTO from '@modules/reservations/dtos/ICreateReservationDTO';

// Repositories
import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';

// Models
import Reservation from '@modules/reservations/infra/models/Reservation';

import NotFoundError from '@shared/errors/NotFoundError';

export default class ReservationsRepository
  implements Partial<IReservationsRepository> {
  private ormRepository: Repository<Reservation>;

  constructor() {
    this.ormRepository = getRepository(Reservation);
  }

  public async findByIdOrFail(reservation_id: string): Promise<Reservation> {
    const foundReservation = await this.ormRepository.findOne({
      id: reservation_id,
    });

    if (!foundReservation) throw new NotFoundError();

    return foundReservation;
  }

  public async save(reservation: Reservation): Promise<Reservation> {
    return this.ormRepository.save(reservation);
  }
}
