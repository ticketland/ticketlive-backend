import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindReservationUseCase from './FindReservationUseCase';

export default class FindReservationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const findReservationUseCase = container.resolve(FindReservationUseCase);

    const reservation = await findReservationUseCase.execute({
      reservation_id,
    });

    return response.json(reservation);
  }
}
