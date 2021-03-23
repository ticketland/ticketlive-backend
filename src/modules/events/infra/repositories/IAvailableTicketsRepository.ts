import AvailableTicket from '../models/AvailableTicket';

export default interface IAvailableTicketsRepository {
  findAllByEventID(event_id: string): Promise<AvailableTicket[]>;
}
