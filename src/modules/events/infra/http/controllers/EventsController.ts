import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import GetAllEventsService from '@modules/events/services/GetAllEventsService';
import GetOneEventService from '@modules/events/services/GetOneEventService';

export default class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAllEvents = container.resolve(GetAllEventsService);

    const events = await getAllEvents.execute();

    return response.json({ events });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_slug } = request.params;

    const getOneEvent = container.resolve(GetOneEventService);

    const event = await getOneEvent.execute({ event_slug });

    return response.json({ event });
  }
}
