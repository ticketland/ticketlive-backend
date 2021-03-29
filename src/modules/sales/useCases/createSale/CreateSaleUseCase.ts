import { inject, injectable } from 'tsyringe';
import { getConnection } from 'typeorm';

import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import IReservationRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import ReservationAlreadyCompletedError from '@modules/reservations/errors/ReservationAlreadyCompletedError';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';
import Ticket from '@modules/tickets/infra/models/Ticket';
import Transaction from '@modules/transactions/infra/models/Transaction';

interface IRequest {
  user_id: string;
  cash_register_id: string;
  reservation_id: string;
  payments: {
    payment_method_id: string;
    value: number;
  }[];
}

@injectable()
export default class CreateSaleUseCase {
  constructor(
    @inject('ReservationsApiRepository')
    private reservationsApiRepository: IReservationRepository,

    @inject('ReservationsRepository')
    private reservationsRepository: IReservationRepository,

    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) { }

  public async execute({
    user_id,
    cash_register_id,
    reservation_id,
    payments,
  }: IRequest): Promise<Ticket[]> {
    const reservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );
    if (reservation.status !== 'waiting')
      throw new ReservationAlreadyCompletedError(
        'Cannot create sale from reservation already completed',
        400,
      );
    const {
      reservation_tickets,
    } = await this.reservationsApiRepository.findByIdOrFail(reservation_id);

    const salePrice = reservation_tickets.reduce(
      (totalPrice, ticket) =>
        totalPrice + ticket.ticket_type.price_in_cents * ticket.quantity,
      0,
    );
    const paymentPrice = payments.reduce(
      (totalPayment, payment) => totalPayment + payment.value,
      0,
    );

    if (salePrice !== paymentPrice)
      throw new AppError('Insufficient payment', 400);

    const sale = await this.salesRepository.create({
      user_id,
      reservation_id,
      price_in_cents: salePrice,
    });

    const transactions: Transaction[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const payment of payments) {
      transactions.push(
        // eslint-disable-next-line no-await-in-loop
        await this.transactionsRepository.create({
          cash_register_id,
          operation_id: '9f0412dc-5999-47db-9aec-a2e8e90ed9ae',
          user_id,
          value: payment.value,
        }),
      );
    }

    Object.assign(reservation, {
      status: 'completed',
      completed_at: new Date(),
    });

    try {
      await getConnection().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(transactions);
        await transactionalEntityManager.save(sale);
        await transactionalEntityManager.save(reservation);
      });
    } catch (err) {
      throw new AppError(
        'Could not create transaction at the moment. Try again.',
        500,
      );
    }

    const tickets = await this.reservationsApiRepository.generateTickets(
      reservation_id,
    );

    return tickets;
  }
}
