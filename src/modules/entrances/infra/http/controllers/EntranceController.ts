import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import CreateEntranceService from '@modules/entrances/services/CreateEntranceService';
import ShowOneEntranceService from '@modules/entrances/services/ShowOneEntranceService';
import ValidateTicketService from '@modules/tickets/services/ValidateTicketService';

export default class EntranceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { ticket_id, ext_event_id, ext_participant_id } = request.body;

    const validateTicket = container.resolve(ValidateTicketService);

    // Valida ticket
    await validateTicket.execute({ ticket_id });

    const createEntrance = container.resolve(CreateEntranceService);

    const entrance = await createEntrance.execute({
      user_id,
      ticket_id,
      ext_event_id,
      ext_participant_id,
    });

    return response.json(entrance);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { entrance_id } = request.params;

    const showOneEntrance = container.resolve(ShowOneEntranceService);

    const entrance = await showOneEntrance.execute({
      entrance_id,
    });

    return response.json(entrance);
  }
}
