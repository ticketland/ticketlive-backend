import AppError from '@shared/errors/AppError';

class UserTokenNotFoundError extends AppError {
  constructor(message = 'Token not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default UserTokenNotFoundError;
