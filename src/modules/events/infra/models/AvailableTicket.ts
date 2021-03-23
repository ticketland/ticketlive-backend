export default class AvailableTicket {
  id: string;

  event_id: string;

  tier: string;

  start_sales: Date;

  end_sales: Date;

  ticketTypes: TicketType[];
}

type TicketType = {
  id: string;
  ticket_tier_id: string;
  type: string;
  description: string;
  price_in_cents: number;
  available_tickets: number;
  reserved_tickets: number;
  sold_tickets: number;
};
