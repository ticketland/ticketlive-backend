import { Router } from 'express';

import CloseCashRegisterController from '@modules/users/useCases/closeCashRegister/CloseCashRegisterController';
import CreateCashRegisterController from '@modules/users/useCases/createCashRegister/CreateCashRegisterController';
import ListCashRegistersController from '@modules/users/useCases/listCashRegisters/ListCashRegistersController';

import cashRegisterTransactionsRouter from './cash.register.transactions.routes';

const cashRegisterRouter = Router();

const closeCashRegisterController = new CloseCashRegisterController();
const createCashRegisterController = new CreateCashRegisterController();
const listCashRegistersController = new ListCashRegistersController();

cashRegisterRouter.get('/', listCashRegistersController.handle);
cashRegisterRouter.post('/', createCashRegisterController.handle);
cashRegisterRouter.patch(
  '/:cash_register_id/close',
  closeCashRegisterController.handle,
);

cashRegisterRouter.use(
  '/:cash_register_id/transactions',
  cashRegisterTransactionsRouter,
);

export default cashRegisterRouter;
