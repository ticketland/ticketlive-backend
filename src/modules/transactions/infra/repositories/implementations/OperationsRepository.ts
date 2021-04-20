import { getRepository, Repository } from 'typeorm';

import Operation from '@modules/transactions/infra/models/Operation';
import IOperationsRepository from '@modules/transactions/infra/repositories/IOperationsRepository';
import NotFoundError from '@shared/errors/NotFoundError';

export default class OperationsRepository implements IOperationsRepository {
  private ormRepository: Repository<Operation>;

  constructor() {
    this.ormRepository = getRepository(Operation);
  }

  public async all(): Promise<Operation[]> {
    const foundOperations = await this.ormRepository.find();

    return foundOperations;
  }

  public async findByIdOrFail(id: string): Promise<Operation> {
    const foundOperation = await this.ormRepository.findOne({ id });

    if (!foundOperation) throw new NotFoundError();

    return foundOperation;
  }
}
