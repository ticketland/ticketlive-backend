import { getRepository, Repository } from 'typeorm';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Interfaces
import IOperationsRepository from '@modules/cashregisters/repositories/IOperationsRepository';

// Models
import Operation from '@modules/cashregisters/infra/entities/typeorm/Operation';

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
