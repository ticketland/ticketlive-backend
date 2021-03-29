import { Request, Response, NextFunction } from 'express';

import UsersRepository from '@modules/users/infra/repositories/implementations/UsersRepository'
import NotFoundError from '@shared/errors/NotFoundError';
import UserWithoutOpenedCashRegisterError from '@modules/users/errors/UserWithoutOpenedCashRegisterError';

export default async function ensureCashRegisterIsOpened(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id: user_id } = request.user
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findByID(user_id, ['cash_registers'])
  if (!user) throw new NotFoundError()

  const cashRegister = user.cash_registers.find(cash_register => cash_register.closed_at === null)
  if (!cashRegister) throw new UserWithoutOpenedCashRegisterError()

  request.cashRegister = { opened_cash_register_id: cashRegister.id }

  return next();
}
