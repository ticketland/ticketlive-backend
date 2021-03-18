import { Router } from 'express';

import ListOperationsController from '@modules/transactions/useCases/listOperations/ListOperationsController';

const operationRouter = Router();
const listOperationsController = new ListOperationsController();

operationRouter.get('/', listOperationsController.handle);

export default operationRouter;
