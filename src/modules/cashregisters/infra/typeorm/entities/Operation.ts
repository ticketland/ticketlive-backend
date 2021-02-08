import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Entities
import Transaction from '@modules/cashregisters/infra/typeorm/entities/Transaction';

@Entity('operacoes')
class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  // Relationships
  @OneToMany(() => Transaction, transaction => transaction.operation)
  transactions: Transaction;
}

export default Operation;
