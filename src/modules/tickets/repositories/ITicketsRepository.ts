// Models
import Ticket from '../infra/typeorm/entities/Ticket';

export default interface ITicketsRepository {
  save(ticket: Ticket): Promise<Ticket>;
  findByID(id: string, relations?: string[]): Promise<Ticket | undefined>;
  fetchByTicketID(id: string): Promise<Ticket>;
  fetchValidateTicket(ticket_id: string): Promise<boolean>;
}
