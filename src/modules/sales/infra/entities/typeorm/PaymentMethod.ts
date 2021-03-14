import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Sale from './Sale';

@Entity('metodos_pagamento')
class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: string;

  @OneToMany(() => Sale, venda => venda.metodoPagamento)
  vendas: Sale[];
}

export default PaymentMethod;
