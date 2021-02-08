import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import ShowAllOperationsService from '@modules/cashregisters/services/ShowAllOperationsService';

export default class OperationController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showOperations = container.resolve(ShowAllOperationsService);

    const operations = await showOperations.execute();

    return response.json({ operations });
  }
}
