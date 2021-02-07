import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
export default class AvailableTicketsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    // const fetchAvailableTickets = container.resolve(FetchAvailableTicketsFromEventService)

    // const availableTickets = fetchAvailableTickets.execute({ event_id });

    // return response.json({ data: availableTickets });
  }
}
