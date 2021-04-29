import { injectable, inject } from 'tsyringe';

import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';
import IEntrancesRepository from '@modules/entrances/repositories/IEntrancesRepository';
import InvalidTicketError from '@modules/reservations/errors/InvalidTicketError';
import TicketAlreadyUsedError from '@modules/tickets/errors/TicketAlreadyUsedError';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  ticket_id: string;
  ext_event_id: string;
  ext_participant_id: string;
  ticket_code: string;
}

@injectable()
class CreateEntranceUseCase {
  constructor(
    @inject('EntrancesRepository')
    private entrancesRepository: IEntrancesRepository,

    @inject('APITicketsRepository')
    private apiTicketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    ticket_id,
    ext_event_id,
    ext_participant_id,
    ticket_code,
  }: IRequest): Promise<Entrance> {
    try {
      const validTicket = await this.apiTicketsRepository.validate({
        ticket_id,
        code: ticket_code,
      });
      if (!validTicket) throw new InvalidTicketError();
    } catch (err) {
      throw new InvalidTicketError();
    }

    const ticketAlreadyUsed = await this.entrancesRepository.findByTicketID(
      ticket_id,
    );
    if (ticketAlreadyUsed) throw new TicketAlreadyUsedError();

    const entrance = await this.entrancesRepository.create({
      ticket_id,
      ext_event_id,
      ext_participant_id,
    });

    return entrance;
  }
}

export default CreateEntranceUseCase;
