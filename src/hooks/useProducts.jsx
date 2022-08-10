import qs from 'qs';
import useSWR from 'swr';

export function useProducts(query) {
  const queryString = qs.stringify(query);

  const url = `/api/admin/products?${queryString}`;

  const { data, error, mutate, isValidating } = useSWR(url);

  return {
    products: data?.data.productList || [],
    isLoading: !error && !data,
    isError: error,
  };
}
