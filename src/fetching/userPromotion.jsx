import axios from 'axios';

export const userPromotion = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/userPromotion',
    data,
    ...options,
  });
};
