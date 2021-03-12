import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

// Configs
import uploadConfig from '@config/upload';

// Entitites
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

@Entity('tickets')
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
}

export default Ticket;
