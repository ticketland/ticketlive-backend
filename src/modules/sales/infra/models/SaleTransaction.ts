import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Transaction from '@modules/transactions/infra/models/Transaction';
import Sale from './Sale';

@Entity('sale_transaction')
class PaymentMethod {
  @PrimaryColumn('uuid')
  sale_id: string;

  @PrimaryColumn('uuid')
  transaction_id: string;

  @Column()
  payment_method_id: string;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}

export default PaymentMethod;
