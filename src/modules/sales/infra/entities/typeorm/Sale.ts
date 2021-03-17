import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/entities/typeorm/User';
import Ticket from '@modules/tickets/infra/entities/typeorm/Ticket';
import PaymentMethod from './PaymentMethod';

@Entity('vendas')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  metodo_pagamento_id: string;

  @Column()
  participante_id: string;

  @Column()
  usuario_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ManyToOne(() => User, user => user.vendas)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => PaymentMethod, metodoPagamento => metodoPagamento.vendas)
  @JoinColumn({ name: 'metodo_pagamento_id' })
  metodoPagamento: PaymentMethod;

  @OneToMany(() => Ticket, ingresso => ingresso.venda)
  ingressos: Ticket[];
}

export default Sale;
