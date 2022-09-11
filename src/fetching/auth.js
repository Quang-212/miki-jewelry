import axios from 'axios';
import axiosInstance from 'src/utils/axios';

export const registerForm = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/auth/register',
    data,
    ...options,
  });
};

export const loginForm = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/auth/login',
    data,
    withCredentials: true,
    ...options,
  });
};

export const logoutForm = (options) => {
  return axiosInstance({
    method: 'DELETE',
    url: '/api/auth/logout',
    ...options,
  });
};
