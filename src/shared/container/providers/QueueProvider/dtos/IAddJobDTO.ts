import { JobOptions } from 'bull';

export default interface IAddJob {
  name: string;
  data?: any;
  options?: JobOptions;
}
