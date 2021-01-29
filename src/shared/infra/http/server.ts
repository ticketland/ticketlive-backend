import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { container } from 'tsyringe';
import acl from 'express-acl';
import cors from 'cors';

// Configs
import uploadConfig from '@config/upload';
import aclConfig from '@config/acl';

// Errors
import AppError from '@shared/errors/AppError';

// Interfaces
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

// Router
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

// Init Queues
const queueProvider: IQueueProvider = container.resolve('QueueProvider');

queueProvider.ui();
queueProvider.process();
// queueProvider.add({ name: 'TestJob' });
// queueProvider.schedule({ name: 'TestJob', date: '2020-06-18 12:34:00' });
// queueProvider.remove({ name: 'TestJob', jobId: 92 });

// Init Server
const app = express();
app.use(cors());

// Set express to json requests
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);
acl.config(aclConfig.config, aclConfig.responseObject);

// Global Error Handler
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(3333, () =>
  console.log(`🚀 Server started on ${process.env.APP_API_URL}`),
);
