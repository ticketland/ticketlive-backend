import { Job } from 'bull';

// DTO's
import IAddJobDTO from '../dtos/IAddJobDTO';
import IScheduleJobDTO from '../dtos/IScheduleJobDTO';
import IRemoveJobDTO from '../dtos/IRemoveJobDTO';

export default interface IQueueProvider {
  get(name: string): any;
  add(data: IAddJobDTO): Promise<Job>;
  schedule(data: IScheduleJobDTO): Promise<Job>;
  remove(data: IRemoveJobDTO): Promise<void>;
  ui(port?: number): void;
  process(): void;
}
