import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://flash-master-backend-production.up.railway.app',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
