import { Router } from 'express';

// Contollers
import FindEventController from '@modules/events/useCases/findEvent/FindEventController';
import ListEventsController from '@modules/events/useCases/listEvents/ListEventsController';
import eventAvailableTicketsRouter from './event.available.tickets.routes';

const eventsRouter = Router();

const findEventController = new FindEventController();
const listEventsController = new ListEventsController();

eventsRouter.get('/', listEventsController.handle);
eventsRouter.get('/:event_id', findEventController.handle);

eventsRouter.use('/:event_id/available-tickets', eventAvailableTicketsRouter);

export default eventsRouter;
