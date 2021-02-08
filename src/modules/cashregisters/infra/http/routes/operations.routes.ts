import { Router } from 'express';

import OperationController from '@modules/cashregisters/infra/http/controllers/OperationController';

const operationRouter = Router();
const operationController = new OperationController();

operationRouter.get('/', operationController.index);

export default operationRouter;
