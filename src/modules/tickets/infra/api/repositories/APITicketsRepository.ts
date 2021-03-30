import { inject, injectable } from 'tsyringe';

import Ticket from '@modules/tickets/infra/models/Ticket';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IHttpProvider from '@shared/container/providers/HttpProvider/models/IHttpProvider';

interface IValidateTicket {
  ticket_id: string;
  code: string;
}

@injectable()
export default class APITicketsRepository
  implements Partial<ITicketsRepository> {
  constructor(
    @inject('HttpProvider')
    private httpProvider: IHttpProvider,
  ) { }
  public async validate({ ticket_id, code }: IValidateTicket): Promise<boolean> {
    const validTicket = await this.httpProvider
      .callAPI()
      .post('/tickets/validate', { ticket_id, code });

    return validTicket.data;
  }
}
