import { inject, injectable } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Entities
import Sale from '@modules/sales/infra/entities/typeorm/Sale';

// Repositories
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import IPaymentMethodsRepository from '@modules/sales/repositories/IPaymentMethodsRepository';
import IReservationRepository from '@modules/reservations/repositories/IReservationsRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  payment_method_id: string;
  ext_participant_id?: string;
  user_id: string;
  reservation_id: string;
}

@injectable()
export default class CreateSaleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ReservationsRepository')
    private reservationsRepository: IReservationRepository,

    @inject('PaymentMethodsRepository')
    private paymentMethodsRepository: IPaymentMethodsRepository,

    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    payment_method_id,
    ext_participant_id,
    user_id,
    reservation_id,
  }: IRequest): Promise<Sale> {
    /*
     * Verificar usuário e buscar o caixa aberto, talvez implementar middleware
     * para forcar caixa aberto e não haver risco de erro disparado aqui
     * Verificar metodo de pagamento
     * verificar reserva
     * finalizar reserva
     * retornar ingressos
     */

    const user = await this.usersRepository.findByID(user_id, [
      'cashRegisters',
    ]);
    if (!user) throw new NotFoundError();

    const paymentMethod = await this.paymentMethodsRepository.findByID(
      payment_method_id,
    );
    if (!paymentMethod) throw new NotFoundError();

    // reservation not found already treated in Repository!
    const reservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );

    const tickets = await this.reservationsRepository.sendReservationCompleteRequest(
      reservation_id,
    );

    const sale = await this.salesRepository.create({
      payment_method_id: paymentMethod.id,
      user_id: user.id,
      ext_participant_id,
    });
    await this.ticketsRepository.createMany(tickets, sale.id);

    reservation.status = 'completed';
    await this.reservationsRepository.save(reservation);

    return this.salesRepository.findByID(sale.id);
  }
}
