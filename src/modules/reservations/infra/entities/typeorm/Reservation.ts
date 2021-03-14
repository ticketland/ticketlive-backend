import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

import TAvailableTicket from '../AvailableTicket';

@Entity('reservas')
class Reservation {
  @PrimaryColumn()
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  status: 'waiting' | 'completed';

  @CreateDateColumn({ type: 'timestamptz', select: false })
  created_at: Date;

  reservationTickets?: TAvailableTicket[];
}

export default Reservation;
