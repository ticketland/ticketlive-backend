import { getRepository, Repository } from 'typeorm';

// Errors
import OperationNotFoundError from '@modules/cashregisters/errors/OperationNotFoundError';

// Repositories
import IOperationsRepository from '@modules/cashregisters/repositories/IOperationsRepository';

// Models
import Operation from '../entities/Operation';

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

    if (!foundOperation) throw new OperationNotFoundError();

    return foundOperation;
  }
}
