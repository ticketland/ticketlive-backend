import { Router } from 'express';

// Contollers
import ListEventAvailableTicketsController from '@modules/events/useCases/listEventAvailableTickets/ListEventAvailableTicketsController';

const eventAvailableTicketsRouter = Router({ mergeParams: true });

const listEventAvailableTicketsController = new ListEventAvailableTicketsController();

eventAvailableTicketsRouter.get(
  '/',
  listEventAvailableTicketsController.handle,
);

export default eventAvailableTicketsRouter;
