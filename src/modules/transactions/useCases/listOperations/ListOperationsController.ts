import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOperationsUseCase from './ListOperationsUseCase';

export default class ListOperationsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listOperationsUseCase = container.resolve(ListOperationsUseCase);

    const operations = await listOperationsUseCase.execute();

    return response.json({ operations });
  }
}
