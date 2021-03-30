export default class ReservationTicket {
  quantity: number;
  ticket_type: {
    id: string;
    type: string;
    description: string;
    price_in_cents: number;
  };
}
