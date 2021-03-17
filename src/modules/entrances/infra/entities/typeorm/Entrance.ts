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
import User from '@modules/users/infra/entities/typeorm/User';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';

@Entity('entrances')
class Entrance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  ticket_id: string;

  @Column()
  ext_event_id: number;

  @Column()
  ext_participant_id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relationships
  @ManyToOne(() => User, user => user.entrance)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}

export default Entrance;
