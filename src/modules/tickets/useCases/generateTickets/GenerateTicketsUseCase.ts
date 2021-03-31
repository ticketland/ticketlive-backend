import { inject, injectable } from 'tsyringe';

import Ticket from '@modules/tickets/infra/models/Ticket';
import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import NotFoundError from '@shared/errors/NotFoundError';

interface IRequest {
  sale_id: string;
}

@injectable()
export default class GenerateTicketsUseCase {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('APITicketsRepository')
    private apiTicketsRepository: ITicketsRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository
  ) { }

  public async execute({ sale_id }: IRequest): Promise<Ticket[]> {
    const sale = await this.salesRepository.findByID(sale_id);
    if (!sale) throw new NotFoundError();

    const generatedTickets = await this.apiTicketsRepository.generateTickets(sale.reservation_id)

    generatedTickets.forEach(generatedTicket =>
      Object.assign(generatedTicket, { sale_id: sale.id })
    );

    const tickets = await this.ticketsRepository.save(generatedTickets);

    return tickets;
  }
}
