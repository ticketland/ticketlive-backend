import { container } from 'tsyringe';

import IPaymentMethodsRepository from '@modules/sales/infra/repositories/IPaymentMethodsRepository';
import PaymentMethodsRepository from '@modules/sales/infra/repositories/implementations/PaymentMethodsRepository';

import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/repositories/implementations/SalesRepository';

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
);
