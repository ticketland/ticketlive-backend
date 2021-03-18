import AppError from '@shared/errors/AppError';

class UnauthorizedUserError extends AppError {
  constructor(message = 'Unauthorized', statusCode = 401) {
    super(message, statusCode);
  }
}

export default UnauthorizedUserError;
