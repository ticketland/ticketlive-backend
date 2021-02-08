import { Router } from 'express';

import CashRegisterController from '@modules/cashregisters/infra/http/controllers/CashRegisterController';

const cashRegisterRouter = Router();
const cashRegisterController = new CashRegisterController();

cashRegisterRouter.get('/', cashRegisterController.index);
cashRegisterRouter.post('/', cashRegisterController.create);
cashRegisterRouter.put('/:cash_register_id', cashRegisterController.update);

export default cashRegisterRouter;
