export default interface ISendTicketsReservationDTO {
  user_id: string;

  tickets: {
    id: string;
    section_id: string;
    allotment_id: string;
    quantity: number;
  }[];
}
