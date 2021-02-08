import AppError from '@shared/errors/AppError';

class CashRegisterNotFoundError extends AppError {
  constructor(message = 'Cash register not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default CashRegisterNotFoundError;
