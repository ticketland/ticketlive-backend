import { injectable, inject } from 'tsyringe';

// Errors
import TicketAlreadyUsedError from '@modules/tickets/errors/TicketAlreadyUsedError';
import TicketNotFoundError from '@modules/tickets/errors/TicketNotFoundError';

// Interfaces
import IEntranceRepository from '@modules/entrance/repositories/IEntranceRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  ticket_id: string;
}

@injectable()
class ValidateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,

    @inject('EntranceRepository')
    private entranceRepository: IEntranceRepository,
  ) {}

  public async execute({ ticket_id }: IRequest): Promise<boolean> {
    const ticketExists = await this.ticketsRepository.findByID(ticket_id);

    if (!ticketExists) throw new TicketNotFoundError();

    const unusedTicket = await this.entranceRepository.findByTicketID(
      ticket_id,
    );

    if (!unusedTicket) throw new TicketAlreadyUsedError();

    return true;
  }
}

export default ValidateTicketService;
