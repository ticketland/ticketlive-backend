import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CancelReservationUseCase from './CancelReservationUseCase';

export default class CancelReservationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const cancelReservationUseCase = container.resolve(
      CancelReservationUseCase,
    );

    await cancelReservationUseCase.execute({
      reservation_id,
    });

    return response.status(204).json();
  }
}
