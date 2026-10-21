import axios, { AxiosInstance } from 'axios';
import { TOKEN_KEY } from '../src/const';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  return api;
};

