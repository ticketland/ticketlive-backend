export default interface ISendTicketsReservationDTO {
  user_id: string;

  tickets: {
    id: number;
    quantity: number;
  }[];
}
