import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services

export default class SaleController {
  public async index(request: Request, response: Response): Promise<Response> {}

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {}

  public async show(request: Request, response: Response): Promise<Response> {}
}
