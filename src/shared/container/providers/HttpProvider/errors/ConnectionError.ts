import AppError from '@shared/errors/AppError';

export default class ConnectionError extends AppError {
  constructor(message = 'Connection error with API', statusCode = 503) {
    super(message, statusCode);
  }
}
