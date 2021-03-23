import { container } from 'tsyringe';

import EventsApiRepository from '@modules/events/infra/repositories/implementations/EventsApiRepository';
import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

import IAvailableTicketsRepository from '../infra/repositories/IAvailableTicketsRepository';
import AvailableTicketsApiRepository from '../infra/repositories/implementations/AvailableTicketsApiRepository';

container.registerSingleton<IEventsRepository>(
  'EventsApiRepository',
  EventsApiRepository,
);

container.registerSingleton<IAvailableTicketsRepository>(
  'AvailableTicketsApiRepository',
  AvailableTicketsApiRepository,
);
