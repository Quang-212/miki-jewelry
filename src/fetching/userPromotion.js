import axiosInstance from 'src/utils/axios';

export const userPromotion = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/userPromotion',
    data,
    ...options,
  });
};
