import { Router } from 'express';

import UserCashRegisterController from '@modules/cashregisters/infra/http/controllers/UserCashRegisterController';

const userCashRegisterRouter = Router();
const userCashRegisterController = new UserCashRegisterController();

userCashRegisterRouter.get(
  '/:user_id/cashregisters',
  userCashRegisterController.index,
);

export default userCashRegisterRouter;
