import { getRepository, Repository } from 'typeorm';

// Interfaces
import IEntranceRepository from '@modules/entrances/repositories/IEntranceRepository';

// DTOs
import ICreateEntranceDTO from '@modules/entrances/dtos/ICreateEntranceDTO';

// Models
import Entrance from '@modules/entrances/infra/entities/typeorm/Entrance';

export default class EntranceRepository implements IEntranceRepository {
  private ormRepository: Repository<Entrance>;

  constructor() {
    this.ormRepository = getRepository(Entrance);
  }

  public async create(entraceData: ICreateEntranceDTO): Promise<Entrance> {
    const entrance = this.ormRepository.create(entraceData);

    await this.ormRepository.save(entrance);

    return entrance;
  }

  public async findByID(id: string): Promise<Entrance | undefined> {
    const foundEntrance = await this.ormRepository.findOne(id);

    return foundEntrance;
  }

  public async findByTicketID(
    ticket_id: string,
  ): Promise<Entrance | undefined> {
    const foundEntrance = await this.ormRepository.findOne({
      where: { ingresso_id: ticket_id },
    });

    return foundEntrance;
  }

  public async findByEventID(event_id: string): Promise<Entrance[]> {
    const foundEntrance = await this.ormRepository.find({
      where: { evento_id: event_id },
    });

    return foundEntrance;
  }
}
