import AppError from '@shared/errors/AppError';

class EmailAlreadyInUseException extends AppError {
  constructor(message = 'Este email já está sendo usado.', statusCode = 400) {
    super(message, statusCode);
  }
}

export default EmailAlreadyInUseException;
