import AppError from '@shared/errors/AppError';

class TicketAlreadyUsedError extends AppError {
  constructor(message = 'Ticket already used!!', statusCode = 401) {
    super(message, statusCode);
  }
}

export default TicketAlreadyUsedError;
