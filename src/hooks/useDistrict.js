import useSWR from 'swr';

export default function useDistrict(provinceCode) {
  const url = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;

  const { data: { districts = [] } = {}, error } = useSWR(provinceCode ? url : null);
  return {
    districts,
    error,
  };
}
