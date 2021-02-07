import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metodos_pagamento')
class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: string;
}

export default PaymentMethod;
