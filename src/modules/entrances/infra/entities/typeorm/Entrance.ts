import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

// Entitites
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';

@Entity('entrances')
class Entrance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ticket_id: string;

  @Column()
  ext_event_id: number;

  @Column()
  ext_participant_id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relationship
  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}

export default Entrance;
