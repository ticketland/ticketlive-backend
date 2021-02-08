import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Operation from './Operation';

@Entity('transacoes')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caixa_id: string;

  @Column()
  venda_id: string;

  @Column()
  operacao_id: string;

  @Column()
  valor: number;

  @Column()
  usuario_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: string;

  // Relationships
  @ManyToOne(() => Operation, operation => operation.transactions)
  @JoinColumn({ name: 'operacao_id' })
  operation: Operation;
}

export default Transaction;
