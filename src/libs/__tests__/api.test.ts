import axios from 'axios';
import { Request } from '../api';

beforeEach(() => {
  window.blocklet = undefined;
});

test('Request.handleRequest', () => {
  window.blocklet = {
    prefix: 'https://baidu.com',
  };

  const app = new Request(axios);
  const axiosConfig = {
    baseURL: '',
    timeout: 3000,
  };

  const config = app.handleRequest(axiosConfig);
  expect(config.baseURL).toBe('https://baidu.com');
  expect(config.timeout).toBe(200000);
  expect(app.handleResponse({ data: 100 } as any)).toBe(100);
});

test('Request.handleRequest', () => {
  window.blocklet = {
    prefix: '',
  };

  const app = new Request(axios);
  const axiosConfig = {
    baseURL: '',
    timeout: 3000,
  };

  const config = app.handleRequest(axiosConfig);
  expect(config.baseURL).toBe('');
  expect(config.timeout).toBe(200000);
  expect(app.handleResponse({ data: 100 } as any)).toBe(100);
});

test('Request.handleResponse', () => {
  const app = new Request(axios);
  expect(app.handleResponse({ data: 100 } as any)).toBe(100);
});

test('Request.handleRequestError', async () => {
  const app = new Request(axios);
  expect(app.handleRequestError(null)).rejects.toBe(null);
});

test('Request.getCloseSoure', async () => {
  const app = new Request(axios);
  const CancelToken = app.getCloseSoure();
  expect(CancelToken.token).not.toBeNull();
});

test('Request.get', async () => {
  const app = new Request(axios);
  app.get('http://127.0.0.1', {});
});

test('Request.get', async () => {
  const app = new Request(axios);
  app.post('http://127.0.0.1', {});
});
