import { container } from 'tsyringe';

import EventsRepository from '@modules/events/infra/axios/repositories/EventsRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);
