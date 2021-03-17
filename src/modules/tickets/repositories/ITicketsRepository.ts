// Models
import Ticket from '../infra/entities/typeorm/Ticket';

export default interface ITicketsRepository {
  // save(ticket: Ticket): Promise<Ticket>;
  // findByID(id: string, relations?: string[]): Promise<Ticket | undefined>;
  // fetchByTicketID(id: string): Promise<Ticket>;
  // fetchValidateTicket(ticket_id: string): Promise<boolean>;
  createMany(tickets: APITicket[], sale_id: string): Promise<Ticket[]>;
}
