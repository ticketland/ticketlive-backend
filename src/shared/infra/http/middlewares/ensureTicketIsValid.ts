import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe'

import APITicketsRepository from '@modules/tickets/infra/api/repositories/APITicketsRepository';
import EntrancesRepository from '@modules/entrances/infra/typeorm/repositories/EntrancesRepository'
import InvalidTicketError from '@modules/reservations/errors/InvalidTicketError';
import TicketAlreadyUsedError from '@modules/tickets/errors/TicketAlreadyUsedError';

export default async function ensureTicketIsValid(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const { ticket_id, code } = request.body

  const apiTicketsRepository = container.resolve(APITicketsRepository)

  const validTicket = await apiTicketsRepository.validate({ ticket_id, code })
  if (!validTicket) throw new InvalidTicketError()

  const entrancesRepository = new EntrancesRepository();

  const entrance = await entrancesRepository.findByTicketID(ticket_id)
  if (entrance) throw new TicketAlreadyUsedError();

  return next();
}
