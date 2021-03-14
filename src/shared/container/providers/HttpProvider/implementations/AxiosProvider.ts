import axios, { AxiosInstance } from 'axios';

// Config
import ticketlandConfig from '@config/ticketland';

// Errors
import NotFoundError from '../errors/NotFoundError';
import ConnectionError from '../errors/ConnectionError';
import ServerError from '../errors/ServerError';

// Interfaces
import IHttpProvider from '../models/IHttpProvider';

export default class AxiosProvider implements IHttpProvider {
  public readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: ticketlandConfig.api.url,
    });

    this.api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (!error.response) throw new ConnectionError();
        if (error.response.status === 500) throw new ServerError();
        if (error.response.status === 404) throw new NotFoundError();

        return Promise.reject(error);
      },
    );
  }

  public callAPI(): AxiosInstance {
    return this.api;
  }
}
