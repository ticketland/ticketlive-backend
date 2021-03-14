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
import User from '@modules/users/infra/typeorm/entities/User';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';

@Entity('entradas')
class Entrance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  ingresso_id: string;

  @Column()
  evento_id: string;

  @Column()
  participante_id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  created_at: Date;

  // Relationships
  @ManyToOne(() => User, user => user.entrance)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ingresso_id' })
  ticket: Ticket;
}

export default Entrance;
