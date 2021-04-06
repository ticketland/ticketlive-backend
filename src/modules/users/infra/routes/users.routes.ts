import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserController from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import ShowAuthenticatedUserController from '@modules/users/useCases/showAuthenticatedUser/ShowAuthenticatedUserController';
import UpdateUserAvatarController from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', listUsersController.handle);
usersRouter.post('/', createUserController.handle);
usersRouter.patch(
  '/avatar',
  [ensureAuthenticated],
  upload.single('avatar'),
  updateUserAvatarController.handle,
);
usersRouter.get(
  '/me',
  [ensureAuthenticated],
  showAuthenticatedUserController.handle,
);

export default usersRouter;
