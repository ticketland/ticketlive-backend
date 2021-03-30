import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import CashRegister from '@modules/users/infra/models/CashRegister';
import Operation from './Operation';
import PaymentMethod from '@modules/sales/infra/models/PaymentMethod';
import Sale from '@modules/sales/infra/models/Sale';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cash_register_id: string;

  @Column()
  operation_id: string;

  @Column()
  payment_method_id: string;

  @Column()
  sale_id: string;

  @Column()
  value: number;

  @Column()
  user_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: string;

  // Relationships
  @ManyToOne(() => Operation, operation => operation.transactions)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @ManyToOne(() => CashRegister, cashRegister => cashRegister.transactions)
  @JoinColumn({ name: 'cash_register_id' })
  cashRegister: CashRegister;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: PaymentMethod;
}

export default Transaction;
