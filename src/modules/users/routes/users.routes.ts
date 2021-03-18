import { Router } from 'express';
import multer from 'multer';

// Configs
import uploadConfig from '@config/upload';

// middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Contollers
import UpdateUserAvatarController from '../useCases/updateUserAvatar/UpdateUserAvatarController';
import CreateUserController from '../useCases/createUser/CreateUserController';
import ShowAuthenticatedUserController from '../useCases/showAuthenticatedUser/ShowAuthenticatedUserController';

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
