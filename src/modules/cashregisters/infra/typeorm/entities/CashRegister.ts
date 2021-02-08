import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('caixas')
class CashRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  valor_abertura: number;

  @Column()
  valor_fechamento: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone' })
  closed_at: string;

  // Relationships
  @OneToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}

export default CashRegister;
