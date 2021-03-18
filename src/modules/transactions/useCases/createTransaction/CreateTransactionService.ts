import { injectable, inject } from 'tsyringe';

// Errors

// Entities
import Transaction from '@modules/transactions/infra/models/Transaction';

// Interfaces
import IOperationsRepository from '../repositories/IOperationsRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  cash_register_id: string;
  sale_id?: string;
  operation_id: string;
  value: number;
  user_id: string;
}

@injectable()
class CreatePaymentMethodService {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    cash_register_id,
    sale_id,
    operation_id,
    value,
    user_id,
  }: IRequest): Promise<Transaction> {
    const operation = await this.operationsRepository.findByIdOrFail(
      operation_id,
    );

    // TODO: implement cash register and sale

    return paymentMethod;
  }
}

export default CreatePaymentMethodService;
