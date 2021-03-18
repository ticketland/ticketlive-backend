import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ShowAuthenticatedUserUseCase from './ShowAuthenticatedUserUseCase';

export default class UserContoller {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const showOneUser = container.resolve(ShowAuthenticatedUserUseCase);

    const user = await showOneUser.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }
}
