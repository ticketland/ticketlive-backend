import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Entities
import Transaction from '@modules/cashregisters/infra/entities/typeorm/Transaction';

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
