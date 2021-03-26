import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

// Entities
import Transaction from '@modules/transactions/infra/models/Transaction';
import User from './User';

@Entity('cash_registers')
class CashRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  opening_balance: number;

  @Column()
  current_balance: number;

  @Column()
  closing_balance: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  closed_at: string;

  // Relationships
  @ManyToOne(() => User, user => user.cash_registers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.cashRegister)
  transactions: Transaction[];
}

export default CashRegister;
