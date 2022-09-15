import axiosInstance from 'src/utils/axios';

export const createOrder = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/order/create',
    data,
    ...options,
  });
};
