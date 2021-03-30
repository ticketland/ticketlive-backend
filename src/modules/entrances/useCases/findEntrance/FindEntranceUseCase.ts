import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';
import IEntranceRepository from '@modules/entrances/repositories/IEntrancesRepository';
import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';

interface IRequest {
  entrance_id: string;
}

@injectable()
class FindEntranceUseCase {
  constructor(
    @inject('EntranceRepository')
    private entranceRepository: IEntranceRepository,
  ) { }

  public async execute({ entrance_id }: IRequest): Promise<Entrance> {
    const entrance = await this.entranceRepository.findByID(entrance_id);

    if (!entrance) throw new NotFoundError();

    return entrance;
  }
}

export default FindEntranceUseCase;
