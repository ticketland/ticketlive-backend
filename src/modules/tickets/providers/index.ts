import { container } from 'tsyringe';

import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';
import TicketsReservationRepository from '@modules/tickets/infra/axios/repositories/TicketsReservationRepository';

container.registerSingleton<ITicketsReservationRepository>(
  'TicketsReservationRepository',
  TicketsReservationRepository,
);
