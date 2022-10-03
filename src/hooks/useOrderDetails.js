import { isEmpty } from 'lodash';
import axiosInstance from 'src/utils/axios';
import useSWR from 'swr';

export default function useOrderDetails(id, options) {
  const url = `/api/order/detail/${id}`;

  const { data = {}, error } = useSWR(id ? url : null, (url) => axiosInstance.get(url), options);
  //* if error => console not on screen
  // console.log(data);

  return {
    order: data.data?.data,
    isLoading: !error && isEmpty(data),
    isError: error,
  };
}
