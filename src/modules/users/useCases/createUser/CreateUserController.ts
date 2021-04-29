import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, password, email } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      cpf,
      password,
      email,
    });

    return response.json(classToClass(user));
  }
}
