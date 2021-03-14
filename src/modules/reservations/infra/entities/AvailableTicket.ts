import { Exclude } from 'class-transformer';

// populado pela API
class AvailableTicket {
  id: number;

  name: string;

  price: number;

  is_half: boolean;

  allotment_id: number;

  created_at: Date;

  updated_at: Date;
}

export default AvailableTicket;
