import { Router } from 'express';
import multer from 'multer';

// Configs
import uploadConfig from '@config/upload';

// Contollers
import UpdateUserAvatarController from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import CreateUserController from '@modules/users/useCases/createUser/CreateUserController';
import ShowAuthenticatedUserController from '@modules/users/useCases/showAuthenticatedUser/ShowAuthenticatedUserController';

// Middleware
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const updateUserAvatarController = new UpdateUserAvatarController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();

const upload = multer(uploadConfig.multer);

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
