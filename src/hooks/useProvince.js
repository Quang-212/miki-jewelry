import useSWR from 'swr';

export default function useAddress() {
  const url = `https://provinces.open-api.vn/api/p`;

  const { data, error } = useSWR(url);

  const provinces = data?.data || [];

  return {
    provinces,
    error,
  };
}
