import { inject, injectable } from 'tsyringe';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';

@injectable()
export default class GetAllEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(): Promise<TEvent[]> {
    const events = await this.eventsRepository.fetchEvents();

    return events;
  }
}
