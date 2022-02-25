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

  async post<req, res>(url: string, data: req): Promise<res> {
    return this._axios.post(url, data);
  }
}

const request = new Request(axios);

export default request;
