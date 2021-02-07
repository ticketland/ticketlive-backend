import { Router } from 'express';

// Contollers
import ValidateTicketController from '../controllers/ValidateTicketController';

const validateTicketRouter = Router();
const validateTicketController = new ValidateTicketController();

validateTicketRouter.get('/:ticket_id', validateTicketController.show);

export default validateTicketRouter;
