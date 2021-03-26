import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('payment_methods')
class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}

export default PaymentMethod;
