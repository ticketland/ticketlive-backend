import AvailableTicket from '@modules/tickets/infra/typeorm/entities/AvailableTicket';

export default interface ICreateTicketReservationDTO {
  user_id: string;
  availableTickets: AvailableTicket[];
}
