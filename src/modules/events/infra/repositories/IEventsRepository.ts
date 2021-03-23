import Event from '../models/Event';

export default interface IEventsRepository {
  findAll(): Promise<Event[]>;
  findByID(id: string): Promise<Event>;
}
