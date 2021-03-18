import AppError from '@shared/errors/AppError';

class CashRegisterAlreadyClosedError extends AppError {
  constructor(message = 'Cash register already closed!', statusCode = 403) {
    super(message, statusCode);
  }
}

export default CashRegisterAlreadyClosedError;
