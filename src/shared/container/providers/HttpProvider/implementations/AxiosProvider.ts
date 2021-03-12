import axios, { AxiosInstance } from 'axios';

// Errors
import NotFoundError from '@shared/errors/NotFoundError';

// Config
import ticketlandConfig from '@config/ticketland';

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
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 404) throw new NotFoundError();
        return Promise.reject(error);
      },
    );
  }

  public callAPI(): AxiosInstance {
    return this.api;
  }
}
