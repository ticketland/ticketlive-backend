import { v4 as uuid } from 'uuid';

import Operation from '@modules/transactions/infra/models/Operation';
import IOperationsRepository from '@modules/transactions/infra/repositories/IOperationsRepository';
import NotFoundError from '@shared/errors/NotFoundError';

class OperationsInMemoryRepository implements IOperationsRepository {
  private operations: Operation[] = [];

  constructor() {
    const withdrawalOperation = new Operation();
    const depositOperation = new Operation();
    const saleOperation = new Operation();

    Object.assign(withdrawalOperation, {
      id: uuid(),
      type: 'sangria',
    });

    Object.assign(depositOperation, {
      id: uuid(),
      type: 'aporte',
    });

    Object.assign(saleOperation, {
      id: uuid(),
      type: 'venda',
    });

    this.operations.push(withdrawalOperation, depositOperation, saleOperation);
  }

  public async all(): Promise<Operation[]> {
    return this.operations;
  }

  public async findByIdOrFail(id: string): Promise<Operation> {
    const foundOperation = this.operations.find(
      (operation) => operation.id === id,
    );

    if (!foundOperation) throw new NotFoundError();

    return foundOperation;
  }
}

export { OperationsInMemoryRepository };
