import { Router } from 'express';

import ListTransactionsController from '@modules/transactions/useCases/listTransactions/ListTransactionsController';

const transactionsRouter = Router();
const listTransactionsController = new ListTransactionsController();

transactionsRouter.get('/', listTransactionsController.handle);

export default transactionsRouter;
