import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindEventUseCase from './FindEventUseCase';

export default class FindEventController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const findEventUseCase = container.resolve(FindEventUseCase);

    const event = await findEventUseCase.execute({ event_id });

    return response.json(event);
  }
}
