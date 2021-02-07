import { container } from 'tsyringe';

import IEntranceRepository from '@modules/entrance/repositories/IEntranceRepository';
import EntranceRepository from '@modules/entrance/infra/typeorm/repositories/EntranceRepository';

container.registerSingleton<IEntranceRepository>(
  'EntranceRepository',
  EntranceRepository,
);
