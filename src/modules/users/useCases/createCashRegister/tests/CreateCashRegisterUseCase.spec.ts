import { CashRegistersInMemoryRepository } from '@modules/users/infra/repositories/in-memory/CashRegistersInMemoryRepository';
import { UsersInMemoryRepository } from '@modules/users/infra/repositories/in-memory/UsersInMemoryRepository';

import CreateCashRegisterUseCase from '../CreateCashRegisterUseCase';

let createCashRegisterUseCase: CreateCashRegisterUseCase;
let cashRegistersInMemoryRepository: CashRegistersInMemoryRepository;
let usersInMemoryRepository: UsersInMemoryRepository;

describe('Create cash register', () => {
  beforeEach(() => {
    cashRegistersInMemoryRepository = new CashRegistersInMemoryRepository();
    usersInMemoryRepository = new UsersInMemoryRepository();

    createCashRegisterUseCase = new CreateCashRegisterUseCase(
      usersInMemoryRepository,
      cashRegistersInMemoryRepository,
    );
  });

  it('should be able to open a cash register to user', async () => {
    const user = await usersInMemoryRepository.create({
      name: 'Usuário teste',
      email: 'teste@gmail.com',
      password: '1234567',
      cpf: '00000000000',
    });

    const cashRegister = await createCashRegisterUseCase.execute({
      user_id: user.id,
      opening_balance: 10000,
    });

    expect(cashRegister).toHaveProperty('id');
    expect(cashRegister.opening_balance).toBe(10000);
    expect(cashRegister.user_id).toBe(user.id);
  });
});
