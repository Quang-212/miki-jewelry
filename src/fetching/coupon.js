const { default: axiosInstance } = require('src/utils/axios');

export const createCoupon = async (data, option) => {
  return await axiosInstance({
    method: 'POST',
    url: '/api/coupon/create',
    data,
    ...option,
  });
};
