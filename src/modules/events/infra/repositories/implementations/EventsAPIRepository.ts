import { inject, injectable } from 'tsyringe';

// Repositories
import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

// Models
import Event from '@modules/events/infra/models/Event';

// Providers
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';

@injectable()
export default class EventsApiRepository implements IEventsRepository {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {}

  public async findByID(event_id: string): Promise<Event> {
    const event = await this.httpProvider.callAPI().get(`/events/${event_id}`);

    return event.data;
  }

  public async findAll(): Promise<Event[]> {
    const events = await this.httpProvider.callAPI().get('/events');

    return events.data;
  }
}
