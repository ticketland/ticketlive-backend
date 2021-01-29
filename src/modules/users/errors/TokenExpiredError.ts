import AppError from '@shared/errors/AppError';

class TokenExpiredError extends AppError {
  constructor(message = 'Token expired!', statusCode = 400) {
    super(message, statusCode);
  }
}

export default TokenExpiredError;
