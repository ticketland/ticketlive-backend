import { injectable, inject } from 'tsyringe';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Interfaces
import IEntranceRepository from '@modules/entrances/repositories/IEntranceRepository';

// Models
import Entrance from '@modules/entrances/infra/entities/typeorm/Entrance';

interface IRequest {
  entrance_id: string;
}

@injectable()
class ShowOneEntranceService {
  constructor(
    @inject('EntranceRepository')
    private entranceRepository: IEntranceRepository,
  ) {}

  public async execute({ entrance_id }: IRequest): Promise<Entrance> {
    const entrance = await this.entranceRepository.findByID(entrance_id);

    if (!entrance) {
      throw new NotFoundError();
    }

    return entrance;
  }
}

export default ShowOneEntranceService;
