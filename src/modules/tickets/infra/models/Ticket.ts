import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Sale from '@modules/sales/infra/models/Sale';

@Entity('tickets')
class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sale_id: string;

  @Column()
  ext_event_id: number;

  @Column()
  event_name: string;

  @Column({ type: 'timestamptz', select: false })
  event_date: Date;

  @Column()
  participant_name: string;

  @Column()
  ticket_type: string;

  @Column()
  code: string;

  @Column()
  price_in_cents: number;

  // Relationships;
  @ManyToOne(() => Sale, sale => sale.tickets)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

export default Ticket;
