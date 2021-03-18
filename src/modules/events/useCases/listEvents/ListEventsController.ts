import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEventUseCase from './ListEventUseCase';

export default class ListEventsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listEventsUseCase = container.resolve(ListEventUseCase);

    const events = await listEventsUseCase.execute();

    return response.json({ events });
  }
}
