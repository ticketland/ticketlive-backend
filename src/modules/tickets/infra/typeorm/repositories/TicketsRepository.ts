import { getRepository, Repository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import Ticket from '@modules/tickets/infra/models/Ticket';
import NotFoundError from '@shared/errors/NotFoundError';

interface IFindAllTickets {
  sale?: string
};

export default class TicketsRepository implements Partial<ITicketsRepository> {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findAll({ sale }: IFindAllTickets): Promise<Ticket[]> {
    const ticketQuery = this.ormRepository.createQueryBuilder('tickets');

    if (sale)
      ticketQuery.andWhere('sale_id = :sale', { sale })

    const tickets = await ticketQuery.getMany();

    return tickets
  }

  public async findByIdOrFail(ticket_id: string): Promise<Ticket> {
    const ticket = await this.ormRepository.findOne(ticket_id);

    if (!ticket) throw new NotFoundError();

    return ticket;
  }

  public async save(tickets: Ticket[]): Promise<Ticket[]> {
    return this.ormRepository.save(tickets)
  }
}
