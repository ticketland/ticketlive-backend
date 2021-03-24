import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateReservationUseCase from './CreateReservationUseCase';

export default class CreateReservationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { tickets } = request.body;

    const createReservationUseCase = container.resolve(
      CreateReservationUseCase,
    );

    const reservation = await createReservationUseCase.execute({
      user_id,
      tickets,
    });

    return response.json(reservation);
  }
}
