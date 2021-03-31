import { Router } from 'express';

import GenerateTicketsController from '@modules/tickets/useCases/generateTickets/GenerateTicketsController';

const generateTicketsRouter = Router({ mergeParams: true });
const generateTicketsController = new GenerateTicketsController();

generateTicketsRouter.post('/', generateTicketsController.handle)

export default generateTicketsRouter;
