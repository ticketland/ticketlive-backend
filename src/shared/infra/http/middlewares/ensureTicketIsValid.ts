import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import EntrancesRepository from '@modules/entrances/infra/typeorm/repositories/EntrancesRepository';
import InvalidTicketError from '@modules/reservations/errors/InvalidTicketError';
import TicketAlreadyUsedError from '@modules/tickets/errors/TicketAlreadyUsedError';
import APITicketsRepository from '@modules/tickets/infra/api/repositories/APITicketsRepository';

export default async function ensureTicketIsValid(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { ticket_id, code } = request.query;

  const apiTicketsRepository = container.resolve(APITicketsRepository);

  const validTicket = await apiTicketsRepository.validate({
    ticket_id: ticket_id as string,
    code: code as string,
  });
  if (!validTicket) throw new InvalidTicketError();

  const entrancesRepository = new EntrancesRepository();

  const entrance = await entrancesRepository.findByTicketID(
    ticket_id as string,
  );
  if (entrance) throw new TicketAlreadyUsedError();

  return next();
}
