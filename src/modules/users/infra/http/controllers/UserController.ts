import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ShowOneUserService from '@modules/users/services/ShowOneUserService';

export default class UserContoller {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const showOneUser = container.resolve(ShowOneUserService);

    const user = await showOneUser.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }
}
