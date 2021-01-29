require('rootpath')();

import Bull, { Queue, JobOptions, ProcessCallbackFunction } from 'bull';
import BullBoard, { UI } from 'bull-board';

import * as glob from 'glob';
import humanInterval from 'human-interval';
import { differenceInMilliseconds, parseISO } from 'date-fns';

// Configs
import redisConfig from '@config/redis';

// Interfaces
import IQueueProvider from '../models/IQueueProvider';
import IAddJobDTO from '../dtos/IAddJobDTO';
import IScheduleJobDTO from '../dtos/IScheduleJobDTO';
import IRemoveJobDTO from '../dtos/IRemoveJobDTO';

interface IQueue {
  name: string;
  bull: Queue;
  handle: ProcessCallbackFunction<any>;
  options: JobOptions | undefined;
}

interface IJob {
  key: string;
  handle: ProcessCallbackFunction<any>;
  options?: JobOptions;
}

export default class BullQueueProvider implements IQueueProvider {
  private _queues: IQueue[] = [];

  constructor() {
    const paths = glob.sync('src/modules/*/jobs/*.job.ts');

    const jobs = paths.map(path => require(path).default);

    this._queues = jobs.map((job: IJob) => ({
      name: job.key,
      bull: new Bull(job.key, { redis: redisConfig }),
      handle: job.handle,
      options: job.options,
    }));
  }

  public get(name: string) {
    return this._queues.find(queue => queue.name === name);
  }

  public add({ name, data, options }: IAddJobDTO) {
    const queue = this.get(name);

    if (!queue) {
      throw new Error('Queue not found');
    }

    const job = queue.bull.add(data, { ...queue.options, ...options });

    return job;
  }

  public schedule({ name, data, date, options }: IScheduleJobDTO) {
    let delay;

    if (typeof date === 'number') {
      delay = date;
    } else if (typeof date === 'string') {
      let byHuman = humanInterval(date);

      if (typeof byHuman === 'undefined') byHuman = 0;

      if (!isNaN(byHuman)) {
        delay = byHuman;
      } else {
        delay = differenceInMilliseconds(parseISO(date), new Date());
      }
    } else {
      delay = differenceInMilliseconds(date, new Date());
    }

    if (delay > 0) {
      return this.add({ name, data, options: { ...options, delay } });
    } else {
      throw new Error('Invalid schedule time');
    }
  }

  async remove({ name, jobId }: IRemoveJobDTO) {
    const queue = this.get(name);

    if (!queue) {
      throw new Error('Queue not found');
    }

    const job = await queue.bull.getJob(jobId);

    if (job) job.remove();
  }

  public ui(port = 9999) {
    BullBoard.setQueues(Object.values(this._queues).map(queue => queue.bull));

    UI.listen(port, () => {
      console.log(`🦏 Bull board on http://localhost:${port}`);
    });
  }

  public process() {
    return this._queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });
    });
  }
}
