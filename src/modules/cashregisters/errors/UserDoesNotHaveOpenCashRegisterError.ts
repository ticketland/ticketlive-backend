import AppError from '@shared/errors/AppError';

class UserDoesNotHaveOpenCashRegisterError extends AppError {
  constructor(
    message = 'This user does not have cash register open!',
    statusCode = 403,
  ) {
    super(message, statusCode);
  }
}

export default UserDoesNotHaveOpenCashRegisterError;
