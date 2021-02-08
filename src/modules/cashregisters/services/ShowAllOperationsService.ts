import { injectable, inject } from 'tsyringe';

// Models
import Operation from '@modules/cashregisters/infra/typeorm/entities/Operation';
import IOperationsRepository from '../repositories/IOperationsRepository';

@injectable()
class ShowAllOperationsService {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(): Promise<Operation[]> {
    const operations = await this.operationsRepository.all();

    return operations;
  }
}

export default ShowAllOperationsService;
