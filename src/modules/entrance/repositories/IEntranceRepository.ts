// Dtos
import ICreateEntraceDTO from '@modules/entrance/dtos/ICreateEntranceDTO';

// Models
import Entrance from '../infra/typeorm/entities/Entrance';

export default interface IUsersRepository {
  create(entraceData: ICreateEntraceDTO): Promise<Entrance>;
  findByTicketID(ticket_id: string): Promise<Entrance | undefined>;
  findByEventID(event_id: string): Promise<Entrance[]>;
  findByID(id: string): Promise<Entrance | undefined>;
}
