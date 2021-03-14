import AppError from '@shared/errors/AppError';

export default class ServerError extends AppError {
  constructor(message = 'API error! Try again later.', statusCode = 500) {
    super(message, statusCode);
  }
}
