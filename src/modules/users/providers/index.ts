import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/repositories/implementations/UsersRepository';

import ICashRegistersRepository from '@modules/users/infra/repositories/ICashRegistersRepository';
import CashRegistersRepository from '@modules/users/infra/repositories/implementations/CashRegistersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICashRegistersRepository>(
  'CashRegistersRepository',
  CashRegistersRepository,
);
