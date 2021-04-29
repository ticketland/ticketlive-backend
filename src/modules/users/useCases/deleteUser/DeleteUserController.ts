import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteUserUseCase from './DeleteUserUseCase';

export default class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({
      user_id,
    });

    return response.status(204).json();
  }
}
