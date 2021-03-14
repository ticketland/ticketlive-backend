import AppError from '@shared/errors/AppError';

class ReservationAlreadyCompletedError extends AppError {
  constructor(
    message = 'This reservation is already finished!!',
    statusCode = 403,
  ) {
    super(message, statusCode);
  }
}

export default ReservationAlreadyCompletedError;
