import { container } from 'tsyringe';

import IPaymentMethodsRepository from '@modules/sales/repositories/IPaymentMethodsRepository';
import PaymentMethodsRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodsRepository';

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);
