import AppError from '@shared/errors/AppError';

class UserWithoutOpenedCashRegisterError extends AppError {
  constructor(
    message = "This user doesn't have a opened cash register!",
    statusCode = 403,
  ) {
    super(message, statusCode);
  }
}

export default UserWithoutOpenedCashRegisterError;
