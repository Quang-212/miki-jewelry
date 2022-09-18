import qs from 'qs';
import axiosInstance from 'src/utils/axios';
import useSWR from 'swr';

export default function useOrders(params = [], query = {}, options, isSearch) {
  const queryString = qs.stringify(query);

  const url = `/api/order/${params.join('/')}?${queryString}`;

  const generateSearchUrl = (query, url) => {
    return query.hasOwnProperty('search') && query.search ? url : null;
  };

  const { data, error } = useSWR(
    isSearch ? generateSearchUrl(query, url) : url,
    (url) => axiosInstance.get(url),
    options,
  );
  //* if error => console not on screen
  // console.log(data, error);

  return {
    ordersState: data?.data || null,
    isLoading: !error && !data && (query.search || !isSearch),
    isError: error,
  };
}
