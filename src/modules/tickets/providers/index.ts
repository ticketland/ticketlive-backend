import { container } from 'tsyringe';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import APITicketsRepository from '@modules/tickets/infra/api/repositories/APITicketsRepository';

container.registerSingleton<Partial<ITicketsRepository>>(
  'TicketsRepository',
  TicketsRepository,
);

container.registerSingleton<Partial<ITicketsRepository>>(
  'APITicketsRepository',
  APITicketsRepository,
);
