import { Router } from 'express';

import CloseCashRegisterController from '@modules/users/useCases/closeCashRegister/CloseCashRegisterController';
import CreateCashRegisterController from '@modules/users/useCases/createCashRegister/CreateCashRegisterController';
import FindAllCashRegistersController from '@modules/users/useCases/findAllCashRegisters/FindAllCashRegistersController';
import cashRegisterTransactionsRouter from './cash.register.transactions.routes';

const cashRegisterRouter = Router();

const closeCashRegisterController = new CloseCashRegisterController();
const createCashRegisterController = new CreateCashRegisterController();
const findAllCashRegistersController = new FindAllCashRegistersController();

cashRegisterRouter.get('/', findAllCashRegistersController.handle);
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
