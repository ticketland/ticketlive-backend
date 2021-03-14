import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('reservas')
class Reservation {
  @PrimaryColumn()
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  status: 'waiting' | 'complete';

  @CreateDateColumn({ type: 'timestamptz', select: false })
  created_at: Date;

  reservationTickets?: ReservationTicket;
}

export default Reservation;
