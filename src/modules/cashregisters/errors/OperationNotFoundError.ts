import AppError from '@shared/errors/AppError';

class OperationNotFoundError extends AppError {
  constructor(message = 'Operation not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default OperationNotFoundError;
