import { container } from 'tsyringe';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import TicketsRepository from '@modules/tickets/infra/repositories/TicketsRepository';

container.registerSingleton<ITicketsRepository>(
  'TicketsRepository',
  TicketsRepository,
);
