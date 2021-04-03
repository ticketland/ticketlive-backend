import { Router } from 'express';

import entranceRouter from '@modules/entrances/infra/http/routes/entrance.routes';
import eventsRouter from '@modules/events/infra/routes/events.routes';
import ticketReservationRouter from '@modules/reservations/infra/routes/reservations.routes';
import paymentMethodRouter from '@modules/sales/infra/routes/payment.methods.routes';
import salesRouter from '@modules/sales/infra/routes/sales.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import operationRouter from '@modules/transactions/infra/routes/operations.routes';
import transactionsRouter from '@modules/transactions/infra/routes/transactions.routes';
import authenticateUsersRouter from '@modules/users/infra/routes/authenticate.users.routes';
import cashregisterRouter from '@modules/users/infra/routes/cash.registers.routes';
import usersRouter from '@modules/users/infra/routes/users.routes';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/authentication', authenticateUsersRouter);
routes.use('/entrance', entranceRouter);
routes.use('/events', eventsRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/payment-methods', paymentMethodRouter);
routes.use('/operations', operationRouter);
routes.use('/cash-registers', [ensureAuthenticated], cashregisterRouter);
routes.use('/reservations', [ensureAuthenticated], ticketReservationRouter);
routes.use('/transactions', [ensureAuthenticated], transactionsRouter);
routes.use('/sales', [ensureAuthenticated], salesRouter);

export default routes;
