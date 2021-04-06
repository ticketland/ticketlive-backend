import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UpdateUserAvatarController from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const avatarUserRouter = Router();

const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig.multer);

avatarUserRouter.patch(
  '/',
  [ensureAuthenticated],
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

export default avatarUserRouter;
