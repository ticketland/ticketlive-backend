import AppError from '@shared/errors/AppError';

class PaymentMethodNotFound extends AppError {
  constructor(message = 'Payment method not found!', statusCode = 404) {
    super(message, statusCode);
  }
}

export default PaymentMethodNotFound;
