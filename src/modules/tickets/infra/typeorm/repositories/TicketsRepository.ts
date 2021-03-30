import { getRepository, Repository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import Ticket from '@modules/tickets/infra/models/Ticket';
import NotFoundError from '@shared/errors/NotFoundError';

export default class TicketsRepository implements Partial<ITicketsRepository> {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findByIdOrFail(ticket_id: string): Promise<Ticket> {
    const ticket = await this.ormRepository.findOne(ticket_id);

    if (!ticket) throw new NotFoundError();

    return ticket;
  }
}
