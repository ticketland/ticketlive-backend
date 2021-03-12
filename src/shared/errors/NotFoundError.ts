import AppError from '@shared/errors/AppError';

class NotFoundError extends AppError {
  constructor(message = 'Not found!!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default NotFoundError;
