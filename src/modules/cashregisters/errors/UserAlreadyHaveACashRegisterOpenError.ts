import AppError from '@shared/errors/AppError';

class UserAlreadyHaveACashRegisterOpenError extends AppError {
  constructor(
    message = 'This user already has a opened cash register!',
    statusCode = 403,
  ) {
    super(message, statusCode);
  }
}

export default UserAlreadyHaveACashRegisterOpenError;
