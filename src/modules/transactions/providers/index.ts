import { container } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/infra/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/repositories/implementations/TransactionsRepository';

import IOperationsRepository from '@modules/transactions/infra/repositories/IOperationsRepository';
import OperationsRepository from '@modules/transactions/infra/repositories/implementations/OperationsRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);
