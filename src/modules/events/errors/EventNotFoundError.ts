import AppError from '@shared/errors/AppError';

class EventNotFoundError extends AppError {
  constructor(message = 'Event not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default EventNotFoundError;
