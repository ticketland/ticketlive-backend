import { Router } from 'express';

// Contollers
import TicketReservationController from '../controllers/TicketReservationController';

const ticketReservationRouter = Router();
const ticketReservationController = new TicketReservationController();

ticketReservationRouter.post('/', ticketReservationController.create);

export default ticketReservationRouter;
