import { Router } from 'express';

import CreateSaleController from '@modules/sales/useCases/createSale/CreateSaleController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureCashRegisterIsOpened from '@shared/infra/http/middlewares/ensureCashRegisterIsOpened';

const saleRouter = Router();
const createSaleController = new CreateSaleController();

saleRouter.post('/', [ensureAuthenticated, ensureCashRegisterIsOpened], createSaleController.create);

export default saleRouter;
