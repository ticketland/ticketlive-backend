export default interface ISendTicketsReservationDTO {
  id: string;
  user_id: string;
  status: 'waiting' | 'completed';
}
