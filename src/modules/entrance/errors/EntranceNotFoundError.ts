import AppError from '@shared/errors/AppError';

class EntranceNotFoundError extends AppError {
  constructor(message = 'Entrance not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default EntranceNotFoundError;
