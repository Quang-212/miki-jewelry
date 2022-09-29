import qs from 'qs';
import useSWR from 'swr';
import axios from 'axios';
import { isEmpty } from 'lodash';

export default function useProducts(query = {}, options, isSearch = false) {
  const queryString = qs.stringify(query);

  const url = `/api/products?${queryString}`;

  const generateSearchUrl = (query, url) => {
    return query.hasOwnProperty('search') && query.search ? url : null;
  };

  const { data = {}, error } = useSWR(
    isSearch ? generateSearchUrl(query, url) : url,
    (url) => axios.get(url),
    options,
  );

  return {
    productsState: data.data?.data || null,
    isLoading: !error && !isEmpty(data) && (query.search || !isSearch),
    isError: error,
  };
}
