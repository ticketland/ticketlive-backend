import { injectable, inject } from 'tsyringe';

// Errors
import EntranceNotFoundError from '@modules/entrance/errors/EntranceNotFoundError';

// Models
import Entrance from '@modules/entrance/infra/typeorm/entities/Entrance';
import IEntranceRepository from '../repositories/IEntranceRepository';

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
      throw new EntranceNotFoundError();
    }

    return entrance;
  }
}

export default ShowOneEntranceService;
