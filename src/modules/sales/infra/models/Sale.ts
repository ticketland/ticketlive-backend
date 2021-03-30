import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/models/User';
import Ticket from '@modules/tickets/infra/models/Ticket';
import Reservation from '@modules/reservations/infra/models/Reservation';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  reservation_id: string;

  @Column()
  price_in_cents: number;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  completed_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Reservation)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @OneToMany(() => Ticket, ticket => ticket.sale)
  tickets: Ticket[];
}

export default Sale;
