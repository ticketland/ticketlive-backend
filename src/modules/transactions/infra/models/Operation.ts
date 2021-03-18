import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Entities
import Transaction from '@modules/transactions/infra/models/Transaction';

@Entity('operations')
class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  // Relationships
  @OneToMany(() => Transaction, transaction => transaction.operation)
  transactions: Transaction;
}

export default Operation;
