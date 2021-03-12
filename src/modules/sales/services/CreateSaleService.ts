import { inject, injectable } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Entities
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';

// Repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import IPaymentMethodsRepository from '@modules/sales/repositories/IPaymentMethodsRepository';
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

interface IRequest {
  metodo_pagamento_id: string;
  participante_id?: string;
  usuario_id: string;
  reservation_id: string;
}

@injectable()
export default class CreateSaleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TicketsReservationRepository')
    private ticketsReservationRepository: ITicketsReservationRepository,

    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,

    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({
    metodo_pagamento_id,
    participante_id,
    usuario_id,
    reservation_id,
  }: IRequest): Promise<Ticket[]> {
    /*
     * Verificar usuário e buscar o caixa aberto, talvez implementar middleware
     * para forcar caixa aberto e não haver risco de erro disparado aqui
     * Verificar metodo de pagamento
     * verificar reserva
     * finalizar reserva
     * retornar ingressos
     */

    const user = await this.usersRepository.findByID(usuario_id, ['caixas']);
    if (!user) throw new NotFoundError();

    const paymentMethod = await this.paymentMethodsRepository.findByID(
      metodo_pagamento_id,
    );
    if (!paymentMethod) throw new NotFoundError();

    // reservation not found already treated in Repository!
    const reservation = await this.ticketsReservationRepository.fetchReservation(
      reservation_id,
    );

    const tickets = await this.ticketsReservationRepository.sendReservationCompleteRequest(
      reservation_id,
    );

    await this.salesRepository.create({
      metodo_pagamento_id,
      usuario_id,
      participante_id,
    });

    return tickets;
  }
}
