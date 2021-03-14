import { getRepository, Repository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import Ticket from '../entities/typeorm/Ticket';

export default class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async createMany(
    apiTickets: APITicket[],
    sale_id: string,
  ): Promise<Ticket[]> {
    const tickets = apiTickets.map(apiTicket => {
      return this.ormRepository.create({
        codigo: apiTicket.code,
        evento_id: apiTicket.event_id.toString(),
        setor: apiTicket.section,
        venda_id: sale_id,
      });
    });

    return this.ormRepository.save(tickets);
  }
}
