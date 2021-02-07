import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import ValidateTicketService from '@modules/tickets/services/ValidateTicketService';

export default class ValidateTicketController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.params;

    const validateTicket = container.resolve(ValidateTicketService);

    const validTicket = await validateTicket.execute({ ticket_id });

    return response.json(validTicket);
  }
}
