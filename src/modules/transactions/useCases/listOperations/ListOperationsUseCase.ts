import { injectable, inject } from 'tsyringe';

// Models
import Operation from '@modules/transactions/infra/models/Operation';
import IOperationsRepository from '@modules/transactions/infra/repositories/IOperationsRepository';

@injectable()
class ListOperationsUseCase {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(): Promise<Operation[]> {
    const operations = await this.operationsRepository.all();

    return operations;
  }
}

export default ListOperationsUseCase;
