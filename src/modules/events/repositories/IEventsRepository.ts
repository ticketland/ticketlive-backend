// Models
import Event from '../infra/entities/Event';

export default interface IEventsRepository {
  fetchEvents(): Promise<Event[]>;
  fetchEvent(event_id: string): Promise<Event>;
}
