import qs from 'qs';
import useSWR from 'swr';

export function useProducts(query) {
  const queryString = qs.stringify(query);

  const url = `/api/products?${queryString}`;

  const { data, error, mutate, isValidating } = useSWR(url);

  return {
    productsState: data?.data || null,
    isLoading: !error && !data,
    isError: error,
  };
}
