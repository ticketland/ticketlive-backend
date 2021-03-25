import { Router } from 'express';

import ListTransactionsController from '@modules/transactions/useCases/listTransactions/ListTransactionsController';
import CreateTransactionController from '@modules/transactions/useCases/createTransaction/CreateTransactionController';
import CreateTransactionValidator from '../validators/CreateTransactionValidator';

const transactionsRouter = Router();
const listTransactionsController = new ListTransactionsController();
const createTransactionController = new CreateTransactionController();

transactionsRouter.get('/', listTransactionsController.handle);
transactionsRouter.post(
  '/',
  CreateTransactionValidator(),
  createTransactionController.handle,
);

export default transactionsRouter;
