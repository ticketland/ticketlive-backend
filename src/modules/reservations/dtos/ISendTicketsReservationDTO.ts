type ReservationTickets = {
  ticket_type_id: number;
  quantity: number;
};

export default interface ISendTicketsReservationDTO {
  user_id: string;
  tickets: ReservationTickets[];
}
