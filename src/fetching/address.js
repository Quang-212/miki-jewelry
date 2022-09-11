import axios from 'axios';

export const getProvinces = (query) => {
  return axios({
    method: 'GET',
    url: 'https://provinces.open-api.vn/api/p',
  });
};
