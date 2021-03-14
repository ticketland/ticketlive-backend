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

@Entity('ingressos')
class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  venda_id: string;

  @Column()
  evento_id: string;

  @Column()
  nome_participante: string;

  @Column()
  setor: string;

  @Column()
  codigo: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  data: Date;

  // Relationships
  @ManyToOne(() => Sale, venda => venda.ingressos)
  @JoinColumn({ name: 'venda_id' })
  venda: Sale;
}

export default Ticket;
