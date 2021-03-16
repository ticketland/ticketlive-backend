// Dtos
import ICreateEntraceDTO from '@modules/entrances/dtos/ICreateEntranceDTO';

// Models
import Entrance from '@modules/entrances/infra/entities/typeorm/Entrance';

export default interface IUsersRepository {
  create(entraceData: ICreateEntraceDTO): Promise<Entrance>;
  findByTicketID(ticket_id: string): Promise<Entrance | undefined>;
  findByEventID(event_id: string): Promise<Entrance[]>;
  findByID(id: string): Promise<Entrance | undefined>;
}
