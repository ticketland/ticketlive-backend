import AppError from '@shared/errors/AppError';

class UserDidntOpenedACashRegisterError extends AppError {
  constructor(
    message = "This user didn't opened a cash register!",
    statusCode = 403,
  ) {
    super(message, statusCode);
  }
}

export default UserDidntOpenedACashRegisterError;
