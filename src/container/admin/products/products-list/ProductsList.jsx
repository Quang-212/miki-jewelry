import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { LoadingRotatingLines } from 'src/components/Loadings';
import DynamicTable from 'src/components/Tables/DynamicTable';
import { deleteProduct } from 'src/fetching/products';
import { useProducts } from 'src/hooks/useProducts';
import { ProductForm } from '../product-form';
import { columnProducts } from './columns-config';

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [showProductsList, setShowProductsList] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({
    data: {},
    isEdit: false,
    formOpen: false,
  });

  const [{ limit, pageIndex, pageCount }, setPagination] = useState({
    limit: 5,
    pageIndex: 0,
    pageCount: 0,
  });

  const { productsState, isLoading, isError } = useProducts({
    limit,
    page: pageIndex,
    select: {
      __v: 0,
    },
  });

  const _products = productsState?.productList;

  const handleCreateProduct = () => {
    setCurrentProduct({
      data: {},
      isEdit: false,
      formOpen: true,
    });
    setShowProductsList((prev) => !prev);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({
      data: product,
      isEdit: true,
      formOpen: true,
    });
    setShowProductsList((prev) => !prev);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct({ id }, { params: { type: Array.isArray(id) ? 'many' : 'one' } });
    id = [id].flat(Infinity);
    setProducts((prev) => prev.filter((product) => !id.includes(product._id)));
  };

  useEffect(() => {
    _products && setProducts(_products);
    _products &&
      setPagination((prev) => ({ ...prev, pageCount: Math.ceil(productsState.total / limit) }));
  }, [_products, limit]);

  const productsColumn = useMemo(() => columnProducts, [products]);
  const productsData = useMemo(() => [...products], [products]);

  if (isError) return <h2>{isError}</h2>;
  //! DUMA NHỚ RETURN CUỐI CÙNG !!! (0h => 5h sáng)
  //! FUCK WHEN LOADING => Table is unmount (the same)
  if (isLoading) return <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />;

  return (
    <section>
      {showProductsList && (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>Admin/Products</span>
              <h2 className="heading-2">Products List</h2>
            </div>
            <Button primary onClick={handleCreateProduct}>
              New Product
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <DynamicTable
              columns={productsColumn}
              data={productsData}
              onPageChange={setPagination}
              pageState={{ limit, pageCount, pageIndex }}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
            />
          </div>
        </>
      )}
      {currentProduct.formOpen && (
        <ProductForm
          setShowProductsList={setShowProductsList}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      )}
    </section>
  );
}
