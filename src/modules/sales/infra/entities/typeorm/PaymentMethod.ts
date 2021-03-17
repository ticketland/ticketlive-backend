import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Sale from './Sale';

@Entity('payment_methods')
class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToMany(() => Sale, sale => sale.paymentMethod)
  sales: Sale[];
}

export default PaymentMethod;
