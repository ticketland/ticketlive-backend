import AppError from '@shared/errors/AppError';

class UserNotFoundError extends AppError {
  constructor(message = 'User not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default UserNotFoundError;
