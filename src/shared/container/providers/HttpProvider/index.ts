import { container } from 'tsyringe';

import IHttpProvider from './models/IHttpProvider';

import AxiosProvider from './implementations/AxiosProvider';

container.registerSingleton<IHttpProvider>('HttpProvider', AxiosProvider);
