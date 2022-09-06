import axiosInstance from 'src/utils/axios';

export const registerForm = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/auth/register',
    data,
    ...options,
  });
};

export const loginForm = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/auth/login',
    data,
    ...options,
  });
};

export const logoutForm = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/auth/logout',
    data,
    ...options,
  });
};
