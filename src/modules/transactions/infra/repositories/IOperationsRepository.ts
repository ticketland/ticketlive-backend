// Entities
import Operation from '@modules/transactions/infra/models/Operation';

export default interface IOperationsRepository {
  all(): Promise<Operation[]>;
  findByIdOrFail(id: string): Promise<Operation>;
}
