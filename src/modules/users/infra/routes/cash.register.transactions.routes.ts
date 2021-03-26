import { Router } from 'express';

import CreateCashRegisterTransactionController from '@modules/users/useCases/createCashRegisterTransaction/CreateCashRegisterTransactionController';
import CreateCashRegisterTransactionValidator from '../validators/CreateCashRegisterTransactionValidator';

const cashRegisterTransactionsRouter = Router({ mergeParams: true });
const createCashRegisterTransactionController = new CreateCashRegisterTransactionController();

cashRegisterTransactionsRouter.post(
  '/',
  CreateCashRegisterTransactionValidator(),
  createCashRegisterTransactionController.handle,
);

export default cashRegisterTransactionsRouter;
