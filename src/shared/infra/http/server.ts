import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import acl from 'express-acl';
import cors from 'cors';
import uploadConfig from '@config/upload';
import aclConfig from '@config/acl';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../../swagger.json'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes);
app.use(errors());

acl.config(aclConfig.config, aclConfig.responseObject);

// Global Error Handler
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details,
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
