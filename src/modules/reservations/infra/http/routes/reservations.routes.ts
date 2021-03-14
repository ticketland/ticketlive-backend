import { Router } from 'express';

// Contollers
import ReservationsController from '../controllers/ReservationsController';

const ticketReservationRouter = Router();
const reservationsController = new ReservationsController();

ticketReservationRouter.post('/', reservationsController.create);
ticketReservationRouter.get('/:reservation_id', reservationsController.show);
// ticketReservationRouter.put(
//   '/:reservation_id',
//   reservationsController.update,
// );
ticketReservationRouter.delete(
  '/:reservation_id',
  reservationsController.delete,
);

export default ticketReservationRouter;
