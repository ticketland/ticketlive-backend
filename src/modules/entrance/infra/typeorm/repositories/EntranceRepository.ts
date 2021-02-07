import { getRepository, Repository } from 'typeorm';

// Repositories
import IEntranceRepository from '@modules/entrance/repositories/IEntranceRepository';

// Interfaces
import ICreateEntranceDTO from '@modules/entrance/dtos/ICreateEntranceDTO';

// Models
import Entrance from '../entities/Entrance';

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
