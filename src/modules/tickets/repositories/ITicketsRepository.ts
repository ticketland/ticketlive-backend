// Models
import Ticket from "@modules/tickets/infra/models/Ticket";

interface IValidateTicket {
  ticket_id: string;
  code: string;
}

export default interface ITicketsRepository {
  findByIdOrFail(ticket_id: string): Promise<Ticket>;
  validate({ ticket_id, code }: IValidateTicket): Promise<boolean>;
}
