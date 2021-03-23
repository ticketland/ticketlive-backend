import { inject, injectable } from 'tsyringe';

// Repositories
import IAvailableTicketsRepository from '@modules/events/infra/repositories/IAvailableTicketsRepository';

// Models
import AvailableTicket from '@modules/events/infra/models/AvailableTicket';

// Providers
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';

@injectable()
export default class AvailableTicketsApiRepository
  implements IAvailableTicketsRepository {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) {}

  public async findAllByEventID(event_id: string): Promise<AvailableTicket[]> {
    const availableTickets = await this.httpProvider
      .callAPI()
      .get(`/events/${event_id}/ticket-tiers/active`);

    return availableTickets.data;
  }
}
