import AppError from '@shared/errors/AppError';

class InvalidTicket extends AppError {
  constructor(message = 'Some tickets are invalid!', statusCode = 400) {
    super(message, statusCode);
  }
}

export default InvalidTicket;
