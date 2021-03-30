import { injectable, inject } from 'tsyringe';

// Entities
import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';

// Interfaces
import IEntrancesRepository from '@modules/entrances/repositories/IEntrancesRepository';

interface IRequest {
  ticket_id: string;
  ext_event_id: string;
  ext_participant_id: string;
}

@injectable()
class CreateEntranceUseCase {
  constructor(
    @inject('EntrancesRepository')
    private entrancesRepository: IEntrancesRepository,
  ) { }

  public async execute({
    ticket_id,
    ext_event_id,
    ext_participant_id,
  }: IRequest): Promise<Entrance> {
    const entrance = await this.entrancesRepository.create({
      ticket_id,
      ext_event_id,
      ext_participant_id,
    });

    return entrance;
  }
}

export default CreateEntranceUseCase;
