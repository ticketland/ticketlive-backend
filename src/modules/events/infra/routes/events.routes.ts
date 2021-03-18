import { Router } from 'express';

// Contollers
import FindEventController from '@modules/events/useCases/findEvent/FindEventController';
import ListEventsController from '@modules/events/useCases/listEvents/ListEventsController';

const eventsRouter = Router();

const findEventController = new FindEventController();
const listEventsController = new ListEventsController();

eventsRouter.get('/', listEventsController.handle);
eventsRouter.get('/:event_slug', findEventController.handle);

export default eventsRouter;
