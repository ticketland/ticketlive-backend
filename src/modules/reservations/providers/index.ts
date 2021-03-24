import { container } from 'tsyringe';

import IReservationsRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import ReservationsRepository from '@modules/reservations/infra/repositories/implementations/ReservationsRepository';
import ReservationsApiRepository from '@modules/reservations/infra/repositories/implementations/ReservationsApiRepository';

container.registerSingleton<Partial<IReservationsRepository>>(
  'ReservationsRepository',
  ReservationsRepository,
);

container.registerSingleton<Partial<IReservationsRepository>>(
  'ReservationsApiRepository',
  ReservationsApiRepository,
);
