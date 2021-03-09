import { Router } from 'express';

// Contollers
import TicketReservationController from '../controllers/TicketReservationController';

const ticketReservationRouter = Router();
const ticketReservationController = new TicketReservationController();

ticketReservationRouter.post('/', ticketReservationController.create);
ticketReservationRouter.get(
  '/:reservation_id',
  ticketReservationController.show,
);
ticketReservationRouter.delete(
  '/:reservation_id',
  ticketReservationController.delete,
);

export default ticketReservationRouter;
