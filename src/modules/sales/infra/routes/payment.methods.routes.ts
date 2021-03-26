import { Router } from 'express';

import CreatePaymenyMethodController from '@modules/sales/useCases/createPaymentMethod/CreatePaymentMethodController';
import ListPaymenyMethodController from '@modules/sales/useCases/listPaymentMethod/ListPaymentMethodsController';
import FindPaymenyMethodController from '@modules/sales/useCases/findPaymentMethod/FindPaymentMethodController';

const paymentMethodRouter = Router();
const createPaymenyMethodController = new CreatePaymenyMethodController();
const listPaymenyMethodController = new ListPaymenyMethodController();
const findPaymenyMethodController = new FindPaymenyMethodController();

paymentMethodRouter.get('/', listPaymenyMethodController.handle);
paymentMethodRouter.post('/', createPaymenyMethodController.handle);
paymentMethodRouter.get(
  '/:payment_method_id',
  findPaymenyMethodController.handle,
);

export default paymentMethodRouter;
