import { injectable, inject } from 'tsyringe';
import { getConnection } from 'typeorm';

import NotFoundError from '@shared/errors/NotFoundError';
import Transaction from '@modules/transactions/infra/models/Transaction';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import IOperationsRepository from '@modules/transactions/infra/repositories/IOperationsRepository';
import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  cash_register_id: string;
  operation_id: string;
  value: number;
  user_id: string;
}

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    cash_register_id,
    operation_id,
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

    const {
      type: operation_type,
      ...operation
    } = await this.operationsRepository.findByIdOrFail(operation_id);
    if (!operation) throw new NotFoundError();

    const createTransaction = await this.transactionsRepository.create({
      cash_register_id,
      operation_id,
      value,
      user_id,
    });

    switch (operation_type) {
      case 'sangria':
        cashRegister.current_value -= value;
        break;
      default:
        cashRegister.current_value += value;
        break;
    }

    try {
      await getConnection().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(createTransaction);
        await transactionalEntityManager.save(cashRegister);
      });
    } catch (err) {
      throw new AppError(
        'Could not create transaction at the moment. Try again.',
        500,
      );
    }

    return createTransaction;
  }
}

export default CreateTransactionUseCase;
