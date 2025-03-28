import axios from 'axios';
import callApi from './callApi';
import { useAuthStore } from '../store/useAuthStore';

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setAccessToken } = useAuthStore.getState();
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      try {
        const accessToken = await callApi.refreshToken();
        setAccessToken(accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return authInstance(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
