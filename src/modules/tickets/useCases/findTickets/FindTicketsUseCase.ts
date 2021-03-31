import { injectable, inject } from 'tsyringe';

import Ticket from '@modules/tickets/infra/models/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  sale?: string;
}

@injectable()
export default class FindTicketsUseCase {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository
  ) { }
  public async execute({ sale }: IRequest): Promise<Ticket[]> {
    const tickets = await this.ticketsRepository.findAll({ sale });

    return tickets;
  }
}
