import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['X-Token'] = token;
      console.log('Request intercepted: X-Token added');
    } else {
      console.log('Request intercepted: no token found');
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // We can handle 401 here or in the thunk.
        // For now, let's just pass it through to the thunk for explicit status setting.
      }
      return Promise.reject(error);
    },
  );

  return api;
};

