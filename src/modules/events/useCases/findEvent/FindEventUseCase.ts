import { inject, injectable } from 'tsyringe';

// Repositories
import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

// Models
import Event from '@modules/events/infra/models/Event';

interface IRequest {
  event_slug: string;
}

@injectable()
export default class FindEventUseCase {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ event_slug }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findBySlug(event_slug);

    return event;
  }
}
