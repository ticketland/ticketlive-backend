import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Ticket from '@modules/tickets/infra/models/Ticket';

@Entity('entrances')
class Entrance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticket_id: string;

  @Column()
  ext_event_id: string;

  @Column()
  ext_participant_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relationship
  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}

export default Entrance;
