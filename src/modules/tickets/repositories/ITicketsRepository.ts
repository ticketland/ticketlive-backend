// Models
import Ticket from '@modules/tickets/infra/models/Ticket';

interface IValidateTicket {
  ticket_id: string;
  code: string;
}

interface IFindAllTickets {
  sale?: string;
}

export default interface ITicketsRepository {
  findAll(filters: IFindAllTickets): Promise<Ticket[]>;
  findByIdOrFail(ticket_id: string): Promise<Ticket>;
  validate({ ticket_id, code }: IValidateTicket): Promise<boolean>;
  generateTickets(reservation_id: string): Promise<Ticket[]>;
  save(tickets: Ticket[]): Promise<Ticket[]>;
}
