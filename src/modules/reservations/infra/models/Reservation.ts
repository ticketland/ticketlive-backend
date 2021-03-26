import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

type ReservationTicket = {
  quantity: number;
  ticket_type: {
    id: string;
    type: string;
    description: string;
    price_in_cents: number;
  };
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
