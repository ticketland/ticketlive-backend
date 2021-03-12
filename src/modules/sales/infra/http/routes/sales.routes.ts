import { Router } from 'express';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.get('/', saleController.index);
saleRouter.post('/', saleController.create);
saleRouter.get('/:sale_id', saleController.show);

export default saleRouter;
