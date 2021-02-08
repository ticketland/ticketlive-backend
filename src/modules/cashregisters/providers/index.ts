import { container } from 'tsyringe';

import ITransactionsRepository from '@modules/cashregisters/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/cashregisters/infra/typeorm/repositories/TransactionsRepository';

import IOperationsRepository from '@modules/cashregisters/repositories/IOperationsRepository';
import OperationsRepository from '@modules/cashregisters/infra/typeorm/repositories/OperationsRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);
