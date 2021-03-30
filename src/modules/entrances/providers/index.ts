import { container } from 'tsyringe';

import IEntrancesRepository from '@modules/entrances/repositories/IEntrancesRepository';
import EntrancesRepository from '@modules/entrances/infra/typeorm/repositories/EntrancesRepository';

container.registerSingleton<IEntrancesRepository>(
  'EntrancesRepository',
  EntrancesRepository,
);
