import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/models/User';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';
import PaymentMethod from './PaymentMethod';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  payment_method_id: string;

  @Column()
  ext_participant_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ManyToOne(() => User, user => user.vendas)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.sales)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @OneToMany(() => Ticket, ticket => ticket.sale)
  tickets: Ticket[];
}

export default Sale;
