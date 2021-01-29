import { JobOptions } from 'bull';

export default interface IScheduleJobDTO {
  name: string;
  date: number | string;
  data?: any;
  options?: JobOptions;
}
