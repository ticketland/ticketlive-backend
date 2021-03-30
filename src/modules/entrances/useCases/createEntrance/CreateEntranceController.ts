import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEntranceUseCase from './CreateEntranceUseCase'

export default class CreateEntranceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { ticket_id, ext_event_id, ext_participant_id, } = request.body
    const createEntranceUseCase = container.resolve(CreateEntranceUseCase);

    const entrance = await createEntranceUseCase.execute({ ticket_id, ext_event_id, ext_participant_id });

    return response.json(entrance);
  }
}
