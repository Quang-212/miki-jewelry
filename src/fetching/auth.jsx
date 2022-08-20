import axios from 'axios';

export const loginForm = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/auth/login',
    data,
    ...options,
  });
};

export const registerForm = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/auth/register',
    data,
    ...options,
  });
};
