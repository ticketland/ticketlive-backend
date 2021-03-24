import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

type ReservationTicket = {
  quantity: number;
  ticket_type_id: string;
};

@Entity('reservations')
class Reservation {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  status: 'waiting' | 'completed';

  @CreateDateColumn({ type: 'timestamptz', select: false })
  created_at: Date;

  reservation_tickets: ReservationTicket[];
}

export default Reservation;
