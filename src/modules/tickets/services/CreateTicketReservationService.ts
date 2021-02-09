import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import AvailableTicket from '@modules/tickets/infra/typeorm/entities/AvailableTicket';

// Interfaces
import ITicketsReservationRepository from '@modules/tickets/repositories/ITicketsReservationRepository';

interface IRequest {
  user_id: string;
  tickets: {
    id: string;
    quantity: number;
  }[];
}

@injectable()
class CreateTicketReservationServices {
  constructor(
    @inject('TicketsReservationRepository')
    private ticketsReservationRepository: ITicketsReservationRepository,
  ) {}

  public async execute({ user_id, tickets }: IRequest): Promise<any> {
    const sendReservation = await this.ticketsReservationRepository.sendResevationRequest(
      { user_id, tickets },
    );

    return sendReservation;
  }
}

export default CreateTicketReservationServices;
