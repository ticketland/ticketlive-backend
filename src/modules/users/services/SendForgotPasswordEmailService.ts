import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import UserNotFoundError from '../errors/UserNotFoundError';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    user = await this.usersRepository.loadUserInformation(user);

    const { token } = await this.userTokensRepository.generate(
      user.id,
      'resetPassword',
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.instructor.name || user.client.name,
        email: user.email,
      },
      subject: '[Smartraining] - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.instructor.name || user.client.name,
          token,
          link: `${process.env.APP_WEB_URL}/auth/resetpassword?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
