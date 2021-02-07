import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import GetAllEventsService from '@modules/events/services/GetAllEventsService';

export default class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAllEvents = container.resolve(GetAllEventsService);

    const events = await getAllEvents.execute();

    return response.json({ events });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    // get event information
  }
}
