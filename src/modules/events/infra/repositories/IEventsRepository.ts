import Event from '../models/Event';

export default interface IEventsRepository {
  findAll(): Promise<Event[]>;
  findBySlug(slug: string): Promise<Event>;
}
