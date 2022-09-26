import axios from 'axios';

export const sendCode = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/code/send',
    data,
    ...options,
  });
};
export const verifyCode = (options) => {
  return axios({
    method: 'GET',
    url: '/api/code/verify',
    ...options,
  });
};
