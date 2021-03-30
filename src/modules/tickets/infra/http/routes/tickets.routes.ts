import ensureTicketIsValid from '@shared/infra/http/middlewares/ensureTicketIsValid';
import { Router } from 'express';


const ticketsRouter = Router();

ticketsRouter.post('/validate', ensureTicketIsValid, (_, response) => {
  return response.json('ticket is valid')
});

export default ticketsRouter;
