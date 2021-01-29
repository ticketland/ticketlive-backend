interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'emailreal@awsses.com',
      name: 'Nome para aparecer no envio de email',
    },
  },
} as IMailConfig;
