import useSWR from 'swr';

export default function useAddress() {
  const url = `https://provinces.open-api.vn/api/p`;

  const { data: provinces = [], error } = useSWR(url);

  return {
    provinces,
    error,
  };
}
