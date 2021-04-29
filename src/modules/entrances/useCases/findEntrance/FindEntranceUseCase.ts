import { injectable, inject } from 'tsyringe';

// Errors
import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';
import IEntrancesRepository from '@modules/entrances/repositories/IEntrancesRepository';
import NotFoundError from '@shared/errors/NotFoundError';

interface IRequest {
  entrance_id: string;
}

@injectable()
class FindEntranceUseCase {
  constructor(
    @inject('EntrancesRepository')
    private entrancesRepository: IEntrancesRepository,
  ) {}

  public async execute({ entrance_id }: IRequest): Promise<Entrance> {
    const entrance = await this.entrancesRepository.findByID(entrance_id);

    if (!entrance) throw new NotFoundError();

    return entrance;
  }
}

export default FindEntranceUseCase;
