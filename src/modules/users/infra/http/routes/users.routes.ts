import { Router } from 'express';
import multer from 'multer';

// Configs
import uploadConfig from '@config/upload';

// Contollers
import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/UserController';

const usersRouter = Router();
const userAvatarContoller = new UserAvatarController();
const userController = new UserController();
const upload = multer(uploadConfig.multer);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarContoller.update,
);
usersRouter.get('/me', userController.show);

export default usersRouter;
