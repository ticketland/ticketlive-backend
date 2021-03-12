import { AxiosInstance } from 'axios';

export default interface IHttpProvider {
  callAPI(): AxiosInstance;
}
