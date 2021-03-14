import { container } from 'tsyringe';

import IPaymentMethodsRepository from '@modules/sales/repositories/IPaymentMethodsRepository';
import PaymentMethodsRepository from '@modules/sales/infra/repositories/PaymentMethodsRepository';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/repositories/SalesRepository';

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
);
