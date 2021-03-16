import { container } from 'tsyringe';

import IEntranceRepository from '@modules/entrances/repositories/IEntranceRepository';
import EntranceRepository from '@modules/entrances/infra/repositories/EntranceRepository';

container.registerSingleton<IEntranceRepository>(
  'EntranceRepository',
  EntranceRepository,
);
