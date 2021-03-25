import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

export default function CreateTransactionValidator(): RequestHandler {
  return celebrate({
    [Segments.BODY]: {
      cash_register_id: Joi.string().uuid().required(),
      operation_id: Joi.string().uuid().required(),
      value: Joi.number().required(),
    },
  });
}
