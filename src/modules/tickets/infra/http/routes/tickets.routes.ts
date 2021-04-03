import { Router } from 'express';

import FindTicketsController from '@modules/tickets/useCases/findTickets/FindTicketsController';
import ensureTicketIsValid from '@shared/infra/http/middlewares/ensureTicketIsValid';

const ticketsRouter = Router();
const findTicketsController = new FindTicketsController();

ticketsRouter.get('/', findTicketsController.handle);
ticketsRouter.post('/validate', ensureTicketIsValid, (_, response) => {
  return response.json('ticket is valid');
});

export default ticketsRouter;
