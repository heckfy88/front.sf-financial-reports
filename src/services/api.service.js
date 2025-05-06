import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    const operUid = localStorage.getItem('operUid');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (operUid) {
      config.headers.operUid = operUid;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
