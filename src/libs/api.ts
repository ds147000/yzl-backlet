import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic, CancelTokenSource } from 'axios';

export class Request {
  private _axios: AxiosStatic;

  constructor(_axios: AxiosStatic) {
    this._axios = _axios;
    this.bindInterceptors();
  }

  bindInterceptors(): void {
    this._axios.interceptors.request.use(this.handleRequest, this.handleRequestError);
    this._axios.interceptors.response.use(this.handleResponse);
  }

  handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;
    return config;
  }

  handleResponse(response: AxiosResponse<any>): any {
    return response.data;
  }

  async handleRequestError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  async post<res>(url: string, data?: any): Promise<res> {
    return this._axios.post(url, data);
  }

  async get<res>(url: string, parmas?: any): Promise<res> {
    return this._axios.get(url, parmas);
  }

  getCloseSoure(): CancelTokenSource {
    return axios.CancelToken.source();
  }
}

const request = new Request(axios);

export default request;
