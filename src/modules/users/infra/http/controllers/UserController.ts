import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ShowOneUserService from '@modules/users/services/ShowOneUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserContoller {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const showOneUser = container.resolve(ShowOneUserService);

    const user = await showOneUser.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password, email } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      cpf,
      password,
      email,
    });

    return response.json(classToClass(user));
  }
}
