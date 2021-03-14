export default interface ISendTicketsReservationDTO {
  id: string;
  usuario_id: string;
  status: 'waiting' | 'complete';
}
