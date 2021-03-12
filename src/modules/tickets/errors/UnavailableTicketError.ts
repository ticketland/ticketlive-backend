import AppError from '@shared/errors/AppError';

interface ITicket {
  ticket: {
    id: string;
    section_id: string;
    allotment_id: string;
    quantity: number;
  }[];
}

class UnavailableTicketError extends AppError {
  constructor(
    message = 'Some ticket are unavailable. Check tickets for details!',
    statusCode = 403,
    tickets: ITicket,
  ) {
    super(message, statusCode, tickets);
  }
}

export default UnavailableTicketError;
