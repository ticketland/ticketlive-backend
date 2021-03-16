import { injectable, inject } from 'tsyringe';

// Errors
// import TicketAlreadyUsedError from '@modules/entrance/errors/TicketAlreadyUsedError';

// Entities
import Entrance from '@modules/entrances/infra/entities/typeorm/Entrance';

// Interfaces
import IEntranceRepository from '../repositories/IEntranceRepository';

interface IRequest {
  user_id: string;
  ticket_id: string;
  ext_event_id: number;
  ext_participant_id: number;
}

@injectable()
class CreateEntranceService {
  constructor(
    @inject('EntranceRepository')
    private entranceRepository: IEntranceRepository,
  ) {}

  public async execute({
    user_id,
    ticket_id,
    ext_event_id,
    ext_participant_id,
  }: IRequest): Promise<Entrance> {
    const entrance = await this.entranceRepository.create({
      user_id,
      ticket_id,
      ext_event_id,
      ext_participant_id,
    });

    return entrance;
  }
}

export default CreateEntranceService;
