import qs from 'qs';
import useSWR from 'swr';
import axiosInstance from 'src/utils/axios';

export default function useNotifications(query = {}, options) {
  const queryString = qs.stringify(query);

  const url = `/api/notifications?${queryString}`;

  const { data = {}, error } = useSWR(
    query.userId ? url : null,
    (url) => axiosInstance.get(url),
    options,
  );

  return {
    data: data.data?.data,
    isLoading: !error && !data,
    error,
  };
}
