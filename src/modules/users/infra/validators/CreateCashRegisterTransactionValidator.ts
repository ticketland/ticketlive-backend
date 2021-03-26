import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export default function CreateCashRegisterTransactionValidator(): RequestHandler {
  return celebrate({
    [Segments.BODY]: {
      operation_id: Joi.string().uuid().required(),
      value: Joi.number().required(),
    },
  });
}
