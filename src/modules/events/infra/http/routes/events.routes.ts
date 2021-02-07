import { Router } from 'express';

// Contollers
import EventsController from '../controllers/EventsController';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.get('/', eventsController.index);

export default eventsRouter;
