import { Router } from 'express';

import CreateSaleController from '@modules/sales/useCases/createSale/CreateSaleController';

const saleRouter = Router();
const createSaleController = new CreateSaleController();

saleRouter.post('/', createSaleController.create);

export default saleRouter;
