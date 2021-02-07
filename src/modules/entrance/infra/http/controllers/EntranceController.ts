import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import CreateEntranceService from '@modules/entrance/services/CreateEntranceService';
import ShowOneEntranceService from '@modules/entrance/services/ShowOneEntranceService';

export default class EntranceController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const { id: user_id } = request.user;
    const { user_id, ticket_id, event_id, participant_id } = request.body;

    const createEntrance = container.resolve(CreateEntranceService);

    const entrance = await createEntrance.execute({
      user_id,
      ticket_id,
      event_id,
      participant_id,
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
