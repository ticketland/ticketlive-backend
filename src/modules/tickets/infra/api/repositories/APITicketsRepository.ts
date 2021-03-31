import { inject, injectable } from 'tsyringe';

import Ticket from '@modules/tickets/infra/models/Ticket';
import Event from '@modules/events/infra/models/Event';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';
import ReservationAlreadyCompletedError from '@modules/reservations/errors/ReservationAlreadyCompletedError';
import ServerError from '@shared/container/providers/HttpProvider/errors/ServerError';

interface IValidateTicket {
  ticket_id: string;
  code: string;
}

interface TicketResponse {
  id: string;
  event_id: string;
  ticket_type_id: string;
  code: string;
  event: Event;
  ticket_type: {
    id: string;
    ticket_tier_id: string;
    type: string;
    description: string;
    price_in_cents: number;
    available_tickets: number;
    reserved_tickets: number;
    sold_tickets: number;
  };
}

@injectable()
export default class APITicketsRepository
  implements Partial<ITicketsRepository> {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) { }
  public async validate({ ticket_id, code }: IValidateTicket): Promise<boolean> {
    const validTicket = await this.httpProvider
      .callAPI()
      .post('/tickets/validate', { ticket_id, code });

    return validTicket.data;
  }

  public async generateTickets(reservation_id: string): Promise<Ticket[]> {
    try {
      const response = await this.httpProvider
        .callAPI()
        .post<TicketResponse[]>(`/reservations/${reservation_id}/tickets`);

      const tickets = response.data.map(ticket => {
        return Object.assign(new Ticket(), {
          id: ticket.id,
          ext_event_id: ticket.event_id,
          event_name: ticket.event.name,
          event_date: ticket.event.date,
          ticket_type: ticket.ticket_type.type,
          code: ticket.code,
          price_in_cents: ticket.ticket_type.price_in_cents,
        });
      });

      return tickets;
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 403:
          throw new ReservationAlreadyCompletedError();
        default:
          throw new ServerError();
      }
    }
  }
}
