import { Router } from 'express';

import PaymentMethodController from '@modules/sales/infra/http/controllers/PaymentMethodController';

const paymentMethodRouter = Router();
const paymentMethodController = new PaymentMethodController();

paymentMethodRouter.get('/', paymentMethodController.index);
paymentMethodRouter.post('/', paymentMethodController.create);
paymentMethodRouter.get('/:payment_method_id', paymentMethodController.show);

export default paymentMethodRouter;
