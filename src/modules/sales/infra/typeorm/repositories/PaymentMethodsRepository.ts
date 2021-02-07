import { getRepository, Repository } from 'typeorm';

// Repositories
import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodsRepository';

// Interfaces
import ICreatePaymentMethodDTO from '@modules/sales/dtos/ICreatePaymentMethodDTO';

// Models
import PaymentMethod from '../entities/PaymentMethod';

export default class EntranceRepository implements IPaymentMethodRepository {
  private ormRepository: Repository<PaymentMethod>;

  constructor() {
    this.ormRepository = getRepository(PaymentMethod);
  }

  public async create(
    entraceData: ICreatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    const entrance = this.ormRepository.create(entraceData);

    await this.ormRepository.save(entrance);

    return entrance;
  }

  public async save(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    return this.ormRepository.save(paymentMethod);
  }

  public async findByID(id: string): Promise<PaymentMethod | undefined> {
    const foundPaymentMethod = await this.ormRepository.findOne(id);

    return foundPaymentMethod;
  }

  public async all(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.ormRepository.find();

    return paymentMethods;
  }
}
