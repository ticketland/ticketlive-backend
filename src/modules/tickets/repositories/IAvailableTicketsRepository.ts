import AvailableTicket from '../infra/typeorm/entities/AvailableTicket' 

export default interface IAvailableTicketsRepository {
  fetchTicketsByEvent(event_id: string): Promise<AvailableTicket[]>;
}