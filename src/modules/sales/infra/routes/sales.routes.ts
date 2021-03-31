import { Router } from 'express';

import CreateSaleController from '@modules/sales/useCases/createSale/CreateSaleController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureCashRegisterIsOpened from '@shared/infra/http/middlewares/ensureCashRegisterIsOpened';
import generateTicketsRouter from '@modules/tickets/infra/http/routes/generate.tickets.routes'

const saleRouter = Router();
const createSaleController = new CreateSaleController();

saleRouter.post('/', [ensureAuthenticated, ensureCashRegisterIsOpened], createSaleController.create);

saleRouter.use('/:sale_id/generate-tickets', generateTicketsRouter)

export default saleRouter;
