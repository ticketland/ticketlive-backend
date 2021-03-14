import { inject, injectable } from 'tsyringe';

// Repositories
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

interface IRequest {
  event_slug: string;
}

@injectable()
export default class GetOneEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ event_slug }: IRequest): Promise<TEvent> {
    const fetchEvent = await this.eventsRepository.fetchEvent(event_slug);

    return fetchEvent;
  }
}
