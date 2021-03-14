import { container } from 'tsyringe';

import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';
import ReservationsRepository from '@modules/reservations/infra/repositories/ReservationsRepository';

container.registerSingleton<IReservationsRepository>(
  'ReservationsRepository',
  ReservationsRepository,
);
