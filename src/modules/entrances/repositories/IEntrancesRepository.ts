import ICreateEntraceDTO from '@modules/entrances/dtos/ICreateEntranceDTO';
import Entrance from '@modules/entrances/infra/typeorm/entities/Entrance';

export default interface IEntrancesRepository {
  create(entraceData: ICreateEntraceDTO): Promise<Entrance>;
  findByTicketID(ticket_id: string): Promise<Entrance | undefined>;
  findByEventID(ext_event_id: string): Promise<Entrance[]>;
  findByID(id: string): Promise<Entrance | undefined>;
}
