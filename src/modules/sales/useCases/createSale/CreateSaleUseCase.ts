import { inject, injectable } from 'tsyringe';
import { getConnection } from 'typeorm';

import defaultConfig from '@config/defaults'

import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import IReservationRepository from '@modules/reservations/infra/repositories/IReservationsRepository';
import ReservationAlreadyCompletedError from '@modules/reservations/errors/ReservationAlreadyCompletedError';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';
import Transaction from '@modules/transactions/infra/models/Transaction';
import ReservationTicket from '@modules/reservations/infra/models/ReservationTicket'
import Sale from '@modules/sales/infra/models/Sale';

interface Payment {
  payment_method_id: string;
  value: number;
}

interface IRequest {
  user_id: string;
  cash_register_id: string;
  reservation_id: string;
  payments: Payment[];
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
  }: IRequest): Promise<Sale> {
    const reservation = await this.reservationsRepository.findByIdOrFail(
      reservation_id,
    );
    if (reservation.status !== 'waiting')
      throw new ReservationAlreadyCompletedError('Invalid reservation', 400);

    const {
      reservation_tickets,
    } = await this.reservationsApiRepository.findByIdOrFail(reservation_id);

    const salePrice = this.calculateTicketsPrice(reservation_tickets);
    const paymentPrice = this.calculatePaymentAmount(payments);

    if (salePrice !== paymentPrice)
      throw new AppError('Insufficient payment', 400);

    let sale = await this.salesRepository.create({
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
          operation_id: defaultConfig.sales.operation_id,
          user_id,
          value: payment.value,
          payment_method_id: payment.payment_method_id
        }),
      );
    }

    Object.assign(reservation, {
      status: 'completed',
      completed_at: new Date(),
    });

    try {
      await getConnection().transaction(async transactionalEntityManager => {
        sale = await transactionalEntityManager.save(sale);

        const createTransactions = transactions.map(
          transaction =>
            Object.assign(transaction, { sale_id: sale.id })
        );

        await transactionalEntityManager.save(createTransactions);
        await transactionalEntityManager.save(reservation);
      });
    } catch (err) {
      console.log(err);
      throw new AppError(
        'Could not create sale at the moment. Please try again.',
        500,
      );
    }

    return sale;
  }

  private calculateTicketsPrice(reservation_tickets: ReservationTicket[]) {
    return reservation_tickets.reduce(
      (totalPrice, ticket) =>
        totalPrice + ticket.ticket_type.price_in_cents * ticket.quantity,
      0,
    );
  }

  private calculatePaymentAmount(payments: Payment[]) {
    return payments.reduce(
      (totalPayment, payment) => totalPayment + payment.value,
      0,
    );
  }
}
