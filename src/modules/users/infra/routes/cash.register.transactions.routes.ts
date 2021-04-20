import { Router } from 'express';

import CreateCashRegisterTransactionController from '@modules/users/useCases/createCashRegisterTransaction/CreateCashRegisterTransactionController';
import { CreateCashRegisterWithdrawalController } from '@modules/users/useCases/createCashRegisterWithdrawal/CreateCashRegisterWithdrawalController';
import { ListCashRegisterTransactionsController } from '@modules/users/useCases/listCashRegisterTransactions/ListCashRegisterTransactionsController';

import CreateCashRegisterTransactionValidator from '../validators/CreateCashRegisterTransactionValidator';
import { createCashRegisterWithdrawalValidator } from '../validators/CreateCashRegisterWithdrawalValidator';

const cashRegisterTransactionsRouter = Router({ mergeParams: true });

const createCashRegisterTransactionController = new CreateCashRegisterTransactionController();
const createCashRegisterWithdrawalController = new CreateCashRegisterWithdrawalController();
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
cashRegisterTransactionsRouter.post(
  '/withdrawal',
  createCashRegisterWithdrawalValidator(),
  createCashRegisterWithdrawalController.handle,
);

export default cashRegisterTransactionsRouter;
