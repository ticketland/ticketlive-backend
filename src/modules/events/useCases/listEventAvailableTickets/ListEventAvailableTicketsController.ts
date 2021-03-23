import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListEventAvailableTicketsUseCase from './ListEventAvailableTicketsUseCase';

export default class ListEventAvailableTicketsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const listEventAvailableTicketsUseCase = container.resolve(
      ListEventAvailableTicketsUseCase,
    );

    const availableTickets = await listEventAvailableTicketsUseCase.execute({
      event_id,
    });

    return response.json(availableTickets);
  }
}
