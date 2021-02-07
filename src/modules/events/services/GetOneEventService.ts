import { injectable } from 'tsyringe';

import Event from '@modules/events/infra/entities/Event';

interface IRequest {
  event_id: string;
}

@injectable()
export default class GetOneEventService {
  constructor();

  public async execute({ event_id }: IRequest): Promise<Event> {}
}
