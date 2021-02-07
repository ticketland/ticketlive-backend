import AppError from '@shared/errors/AppError';

class TicketNotFoundError extends AppError {
  constructor(message = 'Ticket not found!!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default TicketNotFoundError;
