import AppError from '@shared/errors/AppError';

export default class NotFoundError extends AppError {
  constructor(message = 'Not found!', statusCode = 404) {
    super(message, statusCode);
  }
}
