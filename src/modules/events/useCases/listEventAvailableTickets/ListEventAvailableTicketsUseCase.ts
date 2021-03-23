import { inject, injectable } from 'tsyringe';

import AvailableTicket from '@modules/events/infra/models/AvailableTicket';
import IAvailableTicketsRepository from '@modules/events/infra/repositories/IAvailableTicketsRepository';

interface IRequest {
  event_id: string;
}

@injectable()
export default class ListEventAvailableTicketsUseCase {
  constructor(
    @inject('AvailableTicketsApiRepository')
    private availableTicketsApiRepository: IAvailableTicketsRepository,
  ) {}

  public async execute({ event_id }: IRequest): Promise<AvailableTicket[]> {
    const availableTickets = await this.availableTicketsApiRepository.findAllByEventID(
      event_id,
    );

    return availableTickets;
  }
}
