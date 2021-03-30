import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindEntranceUseCase from './FindEntranceUseCase'

export default class FindEntranceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { entrance_id } = request.params;

    const findEntranceUseCase = container.resolve(FindEntranceUseCase);

    const entrance = await findEntranceUseCase.execute({
      entrance_id,
    });

    return response.json(entrance);
  }
}
