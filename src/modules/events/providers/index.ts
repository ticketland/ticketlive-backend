import { container } from 'tsyringe';

import EventsApiRepository from '@modules/events/infra/repositories/implementations/EventsApiRepository';
import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

container.registerSingleton<IEventsRepository>(
  'EventsApiRepository',
  EventsApiRepository,
);
