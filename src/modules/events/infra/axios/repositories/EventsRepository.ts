import axios from 'axios';

// Errors
import EventNotFoundError from '@modules/events/errors/EventNotFoundError';
import AppError from '@shared/errors/AppError';

// Repositories
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

// Models
import Event from '@modules/events/infra/entities/Event';

// Interfaces

export default class EventsRepository implements IEventsRepository {
  public async fetchEvent(event_slug: string): Promise<Event> {
    try {
      const event = await axios.get(
        `http://localhost:3334/api/events/${event_slug}`,
      );
      return event.data;
    } catch (err) {
      if (err.response.status === 404) throw new EventNotFoundError();

      throw new AppError(`API error: ${err}`, 500);
    }
  }

  public async fetchEvents(): Promise<Event[]> {
    try {
      const events = await axios.get('http://localhost:3334/api/events');
      return events.data;
    } catch (err) {
      throw new AppError(`API error: ${err}`, 500);
    }
  }
}
