import { Router } from 'express';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

// Routers
import usersRouter from '@modules/users/infra/routes/users.routes';
import authenticateUsersRouter from '@modules/users/infra/routes/authenticate.users.routes';
import cashregisterRouter from '@modules/users/infra/routes/cash.registers.routes';
import entranceRouter from '@modules/entrances/infra/http/routes/entrance.routes';
import eventsRouter from '@modules/events/infra/routes/events.routes';
import validateTicketRouter from '@modules/tickets/infra/http/routes/validate.ticket.routes';
import paymentMethodRouter from '@modules/sales/infra/http/routes/payment.methods.routes';
import operationRouter from '@modules/transactions/infra/routes/operations.routes';
import ticketReservationRouter from '@modules/reservations/infra/http/routes/reservations.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authentication', authenticateUsersRouter);
routes.use('/entrance', entranceRouter);
routes.use('/events', eventsRouter);
routes.use('/tickets/validate', validateTicketRouter);
routes.use('/payment_methods', paymentMethodRouter);
routes.use('/operations', operationRouter);
routes.use('/cashregisters', [ensureAuthenticated], cashregisterRouter);
routes.use('/reservations', [ensureAuthenticated], ticketReservationRouter);
routes.use('/sales', [ensureAuthenticated], salesRouter);

export default routes;
