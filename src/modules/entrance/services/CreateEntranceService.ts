import { injectable, inject } from 'tsyringe';

// Errors
import TicketAlreadyUsedError from '@modules/entrance/errors/TicketAlreadyUsedError';

// Entities
import Entrance from '@modules/entrance/infra/typeorm/entities/Entrance';

// Interfaces
import IEntranceRepository from '../repositories/IEntranceRepository';

interface IRequest {
  user_id: string;
  ticket_id: string;
  event_id: string;
  participant_id: string;
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
    event_id,
    participant_id,
  }: IRequest): Promise<Entrance> {
    const entrance = await this.entranceRepository.create({
      usuario_id: user_id,
      ingresso_id: ticket_id,
      evento_id: event_id,
      participante_id: participant_id,
    });

    return entrance;
  }
}

export default CreateEntranceService;
