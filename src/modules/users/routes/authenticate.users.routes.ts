import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// Controllers
import AuthenticateUserController from '../useCases/authenticateUser/AuthenticateUserController';

const authenticateUsersRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
);

export default authenticateUsersRouter;
