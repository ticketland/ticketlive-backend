import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name, email, password, cpf } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const updatedUser = await updateUserUseCase.execute({
      user_id,
      name,
      email,
      password,
      cpf,
    });

    return response.json(classToClass(updatedUser));
  }
}

export { UpdateUserController };
