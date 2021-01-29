import { Router } from 'express';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// Routers
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', [ensureAuthenticated, acl.authorize], usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
