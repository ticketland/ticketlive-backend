class TicketReservation {
  id: string;

  user_id: string;

  tickets: {
    id: string;
    quantity: number;
  }[];
}

export default TicketReservation;
