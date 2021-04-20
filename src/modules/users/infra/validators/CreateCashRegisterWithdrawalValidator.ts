import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

function createCashRegisterWithdrawalValidator(): RequestHandler {
  return celebrate({
    [Segments.BODY]: {
      value: Joi.number().greater(0).required(),
    },
  });
}

export { createCashRegisterWithdrawalValidator };
