import axios from 'axios';

// Repositories
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

// Models
import Event from '@modules/events/infra/entities/Event';

// Interfaces

export default class EventsRepository implements IEventsRepository {
  // private ormRepository: Repository<User>;

  // constructor() {
  //   this.ormRepository = getRepository(User);
  // }

  public async fetchEvent(event_id: string): Promise<Event> {
    // TODO:
  }

  public async fetchEvents(): Promise<Event[]> {
    try {
      const events = await axios.get('http://localhost:3334/api/events');
      return events.data;
    } catch (err) {
      console.log(err);
    }
  }
}
