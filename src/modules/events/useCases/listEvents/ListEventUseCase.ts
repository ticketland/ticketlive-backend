import { inject, injectable } from 'tsyringe';

import IEventsRepository from '@modules/events/infra/repositories/IEventsRepository';

import Event from '@modules/events/infra/models/Event';

@injectable()
export default class ListEventUseCase {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.findAll();

    return events;
  }
}
