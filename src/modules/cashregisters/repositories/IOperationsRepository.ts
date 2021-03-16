// Entities
import Operation from '@modules/cashregisters/infra/entities/typeorm/Operation';

export default interface IOperationsRepository {
  all(): Promise<Operation[]>;
  findByIdOrFail(id: string): Promise<Operation>;
}
