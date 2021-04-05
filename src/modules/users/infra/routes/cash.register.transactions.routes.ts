import { Router } from 'express';

import CreateCashRegisterTransactionController from '@modules/users/useCases/createCashRegisterTransaction/CreateCashRegisterTransactionController';
import { ListCashRegisterTransactionsController } from '@modules/users/useCases/listCashRegisterTransactions/ListCashRegisterTransactionsController';

import CreateCashRegisterTransactionValidator from '../validators/CreateCashRegisterTransactionValidator';

const cashRegisterTransactionsRouter = Router({ mergeParams: true });
const createCashRegisterTransactionController = new CreateCashRegisterTransactionController();
const listCashRegisterTransactionsController = new ListCashRegisterTransactionsController();

cashRegisterTransactionsRouter.get(
  '/',
  listCashRegisterTransactionsController.handle,
);
cashRegisterTransactionsRouter.post(
  '/',
  CreateCashRegisterTransactionValidator(),
  createCashRegisterTransactionController.handle,
);

export default cashRegisterTransactionsRouter;
