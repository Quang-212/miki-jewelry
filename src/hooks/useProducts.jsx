import axios from 'axios';
import qs from 'qs';
import useSWR from 'swr';

export function useProducts(query, options) {
  const queryString = qs.stringify(query);

  const url = `/api/products?${queryString}`;

  const { data, error, mutate, isValidating } = useSWR(url, (url) => axios.get(url), options);
  //* if error => console not on screen
  console.log(error);

  return {
    productsState: data?.data || null,
    isLoading: !error && !data,
    isError: error,
  };
}
