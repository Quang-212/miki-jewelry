import useSWR, { useSWRConfig } from 'swr';

export function useProducts(limit = 10) {
  const url = `/api/admin/products?limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(url);

  return {
    products: data?.data.productList,
    isLoading: !error && !data,
    isError: error,
  };
}
