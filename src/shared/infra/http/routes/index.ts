import { Router } from 'express';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Routers
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import entranceRouter from '@modules/entrance/infra/http/routes/entrance.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import validateTicketRouter from '@modules/tickets/infra/http/routes/validate.ticket.routes';
import paymentMethodRouter from '@modules/sales/infra/http/routes/payment.methods.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/entrance', entranceRouter);
routes.use('/events', eventsRouter);
routes.use('/tickets/validate', validateTicketRouter);
routes.use('/payment_methods', paymentMethodRouter);

export default routes;
