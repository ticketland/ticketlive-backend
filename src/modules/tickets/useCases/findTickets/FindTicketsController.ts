import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindTicketsUseCase from './FindTicketsUseCase'

export default class FindTicketsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { sale } = request.query
    const findTicketsUseCase = container.resolve(FindTicketsUseCase);

    const tickets = await findTicketsUseCase.execute({ sale: sale as string });

    return response.json(tickets);
  }
}
