import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import { useProducts } from 'src/hooks/useProducts';

export function ProductsPagination({ page, setPage, limit, setLimit }) {
  const router = useRouter();
  const { query, pathname } = router;

  const { productsState, isLoading } = useProducts({
    page: page + 1,
    limit,
    select: {
      _id: 1,
      name: 1,
      images: 1,
      stocks: 1,
    },
  });
  const products = productsState?.productList;

  useEffect(() => {
    if (query.page) {
      let p = Number(query.page) >= 0 ? query.page : 0;
      setPage(Number(p));
    }
    if (query.limit) {
      let l = Number(query.limit) >= 10 ? query.limit : 10;
      setLimit(Number(l));
    }
  }, [query.page, query.limit]);

  const handlePagination = (pageIndex) => {
    if (pathname !== '/products') return;
    let p = pageIndex >= 0 ? pageIndex : 0;
    router.replace(`?page=${p}&limit=${limit}`);
  };

  return (
    <div>
      <Button outline onClick={() => handlePagination(page - 1)} disabled={page === 0 || isLoading}>
        Prev
      </Button>
      <span>{page + 1}</span>
      <Button
        outline
        onClick={() => handlePagination(page + 1)}
        disabled={!products?.length || isLoading}
      >
        Next
      </Button>
    </div>
  );
}
