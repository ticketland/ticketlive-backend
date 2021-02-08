// Entities
import Operation from '@modules/cashregisters/infra/typeorm/entities/Operation';

export default interface IOperationsRepository {
  all(): Promise<Operation[]>;
  findByIdOrFail(id: string): Promise<Operation>;
}
