import axios from 'axios';

export const registerForm = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/auth/register',
    data,
    ...options,
  });
};
