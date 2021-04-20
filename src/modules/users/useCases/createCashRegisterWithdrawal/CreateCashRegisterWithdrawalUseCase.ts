import { injectable, inject } from 'tsyringe';
import { getConnection } from 'typeorm';

import { operationsDefaults, paymentMethodsDefaults } from '@config/defaults';
import Transaction from '@modules/transactions/infra/models/Transaction';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';
import CashRegister from '@modules/users/infra/models/CashRegister';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import NotFoundError from '@shared/errors/NotFoundError';

interface IRequest {
  cash_register_id: string;
  value: number;
  user_id: string;
}

@injectable()
class CreateCashRegisterWithdrawalUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    cash_register_id,
    value,
    user_id,
  }: IRequest): Promise<Transaction> {
    const findUser = await this.usersRepository.findByID(user_id, [
      'cash_registers',
    ]);
    if (!findUser) throw new NotFoundError();

    const cashRegister = findUser.cash_registers.find(
      ({ id, closed_at }) => id === cash_register_id && closed_at === null,
    );
    if (!cashRegister) throw new AppError('Invalid Cash Register', 400);

    const transactions = await this.transactionsRepository.findByCashRegisterID(
      cash_register_id,
    );
    if (this.moneyInCashRegister(cashRegister, transactions) < value)
      throw new AppError('Insufficient balance to withdrawal', 400);

    const createWithdrawal = await this.transactionsRepository.create({
      cash_register_id,
      operation_id: operationsDefaults.withdrawal_operation_id,
      value,
      user_id,
    });

    cashRegister.current_balance -= value;

    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(createWithdrawal);
        await transactionalEntityManager.save(cashRegister);
      });
    } catch (err) {
      console.log(err);
      throw new AppError(
        'Could not create transaction at the moment. Try again.',
        500,
      );
    }

    return createWithdrawal;
  }

  private moneyInCashRegister(
    cashRegister: CashRegister,
    transactions: Transaction[],
  ) {
    return transactions.reduce((moneyInCashRegister, transaction) => {
      switch (transaction.operation_id) {
        case operationsDefaults.withdrawal_operation_id:
          return moneyInCashRegister - transaction.value;
        case operationsDefaults.sale_operation_id:
          if (
            transaction.payment_method_id ===
            paymentMethodsDefaults.money_payment_method_id
          )
            return moneyInCashRegister + transaction.value;
          break;
        default:
          return moneyInCashRegister + transaction.value;
      }
      return moneyInCashRegister;
    }, cashRegister.opening_balance);
  }
}

export { CreateCashRegisterWithdrawalUseCase };
