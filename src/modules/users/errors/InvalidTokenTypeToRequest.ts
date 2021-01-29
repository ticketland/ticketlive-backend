import AppError from '@shared/errors/AppError';

class InvalidTokenTypeToRequest extends AppError {
  constructor(message = 'Invalid token use!', statusCode = 403) {
    super(message, statusCode);
  }
}

export default InvalidTokenTypeToRequest;
