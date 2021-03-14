type TReservationTicket = {
  id: number;
  name: string;
  price: number;
  is_half: boolean;
  allotment_id: number;
  created_at: Date;
  updated_at: Date;
  pivot: {
    ticket_id: number;
    reservation_id: string;
    quantity: number;
  };
};
