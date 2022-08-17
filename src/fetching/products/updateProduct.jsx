import axios from 'axios';

export const updateProduct = (data, value, options) => {
  return axios({
    method: 'PATCH',
    url: `/api/products/update?id=${value}`,
    data,
    ...options,
  });
};
