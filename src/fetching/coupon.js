const { default: axiosInstance } = require('src/utils/axios');

export const createCoupon = async (data, options) => {
  return await axiosInstance({
    method: 'POST',
    url: '/api/coupon/create',
    data,
    ...options,
  });
};

export const getMyCoupon = async (userId, options) => {
  return await axiosInstance({
    method: 'GET',
    url: `/api/coupon/${userId}`,
    ...options,
  });
};

export const applyCoupon = async (options) => {
  return await axiosInstance({
    method: 'GET',
    url: `/api/coupon/apply`,
    ...options,
  });
};
