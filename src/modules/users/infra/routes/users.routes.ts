import { Router } from 'express';

import CreateUserController from '@modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '@modules/users/useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import ShowAuthenticatedUserController from '@modules/users/useCases/showAuthenticatedUser/ShowAuthenticatedUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import avatarUserRouter from './avatar.user.routes';

const usersRouter = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRouter.get('/', listUsersController.handle);
usersRouter.post('/', createUserController.handle);
usersRouter.put('/:user_id', updateUserController.handle);
usersRouter.get(
  '/me',
  [ensureAuthenticated],
  showAuthenticatedUserController.handle,
);
usersRouter.delete('/:user_id', deleteUserController.handle);

usersRouter.use('/avatar', avatarUserRouter);

export default usersRouter;
