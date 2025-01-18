import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL ?? 'https://gridware.disrupts.pro/admin/dashboard/api/v1',
  withCredentials: false,
});

export const setAccessTokenInInterceptor = (accessToken: string) => {
  API.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};
