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
import SaleTransaction from '@modules/sales/infra/models/SaleTransaction';
import Operation from './Operation';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cash_register_id: string;

  @Column()
  operation_id: string;

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

  @OneToMany(() => SaleTransaction, saleTransaction => saleTransaction.sale)
  sale_transactions: SaleTransaction[];
}

export default Transaction;
