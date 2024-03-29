import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GenerateTicketsUseCase from './GenerateTicketsUseCase';

export default class GenerateTicketsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.params;

    const generateTicketsUseCase = container.resolve(GenerateTicketsUseCase);

    const tickets = await generateTicketsUseCase.execute({ sale_id });

    return response.json(tickets);
  }
}
