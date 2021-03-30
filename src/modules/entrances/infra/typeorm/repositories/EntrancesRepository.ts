import { getRepository, Repository } from 'typeorm';

import IEntrancesRepository from '@modules/entrances/repositories/IEntrancesRepository';
import ICreateEntranceDTO from '@modules/entrances/dtos/ICreateEntranceDTO';
import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';

export default class EntrancesRepository implements IEntrancesRepository {
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
    const entrance = await this.ormRepository.findOne(id);

    return entrance;
  }

  public async findByTicketID(
    ticket_id: string,
  ): Promise<Entrance | undefined> {
    const entrance = await this.ormRepository.findOne({
      where: { ingresso_id: ticket_id },
    });

    return entrance;
  }

  public async findByEventID(ext_event_id: string): Promise<Entrance[]> {
    const entrances = await this.ormRepository.find({
      where: { ext_event_id },
    });

    return entrances;
  }
}
