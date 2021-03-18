import { container } from 'tsyringe';

import EventsAPIRepository from '@modules/events/infra/repositories/implementations/EventsAPIRepository';
import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

container.registerSingleton<IEventsRepository>(
  'EventsAPIRepository',
  EventsAPIRepository,
);
