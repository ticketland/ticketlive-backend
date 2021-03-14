import { inject, injectable } from 'tsyringe';

// Repositories
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

// Models
import Event from '@modules/events/infra/entities/Event';

// Providers
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';

@injectable()
export default class EventsRepository implements IEventsRepository {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {}

  public async fetchEvent(event_slug: string): Promise<Event> {
    const event = await this.httpProvider
      .callAPI()
      .get(`/events/${event_slug}`);

    return event.data;
  }

  public async fetchEvents(): Promise<Event[]> {
    const events = await this.httpProvider.callAPI().get('/events');

    return events.data;
  }
}
