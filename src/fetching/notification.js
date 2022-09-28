import axiosInstance from 'src/utils/axios';

export const markAsReadNotification = (data, options) => {
  return axiosInstance({
    method: 'POST',
    url: '/api/notifications/mark-as-read',
    data,
    ...options,
  });
};

export const updateNotification = (data, options) => {
  return axiosInstance({
    method: 'PATCH',
    url: '/api/notifications/update',
    data,
    ...options,
  });
};
