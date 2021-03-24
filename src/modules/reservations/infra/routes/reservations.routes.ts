import { Router } from 'express';

// Contollers
import CreateReservationController from '@modules/reservations/useCases/createReservation/CreateReservationController';
import FindReservationController from '@modules/reservations/useCases/findReservation/FindReservationController';
import CancelReservationController from '@modules/reservations/useCases/cancelReservation/CancelReservationController';

const ticketReservationRouter = Router();

const createReservationController = new CreateReservationController();
const findReservationController = new FindReservationController();
const cancelReservationController = new CancelReservationController();

ticketReservationRouter.post('/', createReservationController.handle);
ticketReservationRouter.get(
  '/:reservation_id',
  findReservationController.handle,
);
ticketReservationRouter.patch(
  '/:reservation_id/cancel',
  cancelReservationController.handle,
);

export default ticketReservationRouter;
