import { Router } from 'express';

// Contollers
import EntranceController from '../controllers/EntranceController';

const entranceRouter = Router();
const entranceController = new EntranceController();

entranceRouter.post('/', entranceController.create);
entranceRouter.get('/:entrance_id', entranceController.show);

export default entranceRouter;
