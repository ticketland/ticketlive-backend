import { inject, injectable } from 'tsyringe';

import Event from '@modules/events/infra/entities/Event';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';

@injectable()
export default class GetAllEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.fetchEvents();

    return events;
  }
}
