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

export const userExistedChecking = (email, options) => {
  return axios({
    method: 'GET',
    url: `/api/users/${email}`,
    ...options,
  });
};

export const emailChecking = (data, options) => {
  return axios({
    method: 'GET',
    url: '/api/users/checking',
    data,
    ...options,
  });
};

export const resetPassword = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/users/reset-password',
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

export const initOAuthUser = (options) => {
  return axios({
    method: 'GET',
    url: '/api/users/oauth-init',
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
