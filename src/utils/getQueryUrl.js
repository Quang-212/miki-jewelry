import { useRouter } from 'next/router';

const getQueryUrl = () => {
  const router = useRouter();
  const { query } = router;
  const page = Number(query.page) >= 1 ? Number(query.page) : 1;
  const limit = Number(query.limit) >= 16 ? Number(query.limit) : 16;

  return {
    router,
    page,
    limit,
  };
};

export default getQueryUrl;
