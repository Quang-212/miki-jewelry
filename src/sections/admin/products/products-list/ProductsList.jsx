import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { LoadingRotatingLines } from 'src/components/Loadings';
import Table, { COLUMNS_PRODUCTS } from 'src/components/Table';
import { useProducts } from 'src/hooks/useProducts';
import { PATH } from 'src/routes';
import { CreateProduct } from '../create-product';

export function ProductsList() {
  const [products, setProducts] = useState([]);

  const [{ limit, pageIndex, pageCount }, setPagination] = useState({
    limit: 5,
    pageIndex: 0,
    pageCount: 0,
  });

  const { productsState, isLoading, isError } = useProducts({
    limit,
    page: pageIndex,
    select: {
      slug: 0,
      __v: 0,
    },
  });

  const _products = productsState?.productList;

  // const handleDelete = async (id, index) => {
  //   const res = await axios({
  //     method: 'POST',
  //     url: '/api/products/delete',
  //     data: { id },
  //   });

  //   const dataUpdate = [..._products];
  //   console.log(dataUpdate);
  //   dataUpdate.splice(index, 1);
  //   // setProducts(dataUpdate);
  //   console.log(dataUpdate);
  // };

  const handleDelete = (index) => {
    const dataUpdate = [..._products];
    console.log(dataUpdate);
    dataUpdate.splice(index, 1);
    setProducts(dataUpdate);
    console.log(dataUpdate);
  };

  useEffect(() => {
    _products && setProducts(_products);
    _products &&
      setPagination((prev) => ({ ...prev, pageCount: Math.ceil(productsState.total / limit) }));
  }, [_products, limit]);

  const productsColumn = useMemo(() => COLUMNS_PRODUCTS, [products]);
  const productsData = useMemo(() => [...products], [products]);
  // const [data, setData] = useState(productsData);
  // console.log(productsData);

  if (isError) return <h2>{isError}</h2>;
  //! DUMA NHỚ RETURN CUỐI CÙNG !!!
  //! FUCK WHEN LOADING => Table is unmount
  if (isLoading) return <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />;

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Admin/Products</span>
          <h2 className="heading-2">Products List</h2>
        </div>
        <Button primary internalLink={PATH.createProduct}>
          New Product
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={() => setLimit((prev) => prev + 1)}>Plus One</button>
        <Table
          columns={productsColumn}
          data={productsData}
          onPageChange={setPagination}
          pageState={{ limit, pageCount, pageIndex }}
          handleDelete={handleDelete}
        />
      </div>
    </section>
  );
}
