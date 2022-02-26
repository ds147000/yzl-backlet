import axios, { AxiosStatic } from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => response.data);

class Request {
  private _axios: AxiosStatic;

  constructor(_axios: AxiosStatic) {
    this._axios = _axios;
  }

  async post<res>(url: string, data?: any): Promise<res> {
    return this._axios.post(url, data);
  }

  async get<res>(url: string, parmas?: any): Promise<res> {
    return this._axios.get(url, parmas);
  }
}

const request = new Request(axios);

export default request;
