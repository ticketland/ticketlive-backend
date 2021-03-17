import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Sale from '@modules/sales/infra/entities/typeorm/Sale';

@Entity('tickets')
class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sale_id: string;

  @Column()
  ext_event_id: number;

  @Column()
  participant_name: string;

  @Column()
  sector: string;

  @Column()
  code: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  event_date: Date;

  // Relationships;
  @ManyToOne(() => Sale, sale => sale.tickets)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

export default Ticket;
