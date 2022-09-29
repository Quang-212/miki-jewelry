import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { LoadingRotatingLines } from 'src/components/Loadings';
import DynamicTable from 'src/components/Tables/DynamicTable';
import { deleteProduct, getProducts } from 'src/fetching/products';
import { ProductForm } from '../product-form';
import { columnProducts } from './columns-config';

export function ProductsList() {
  const [showProductsList, setShowProductsList] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({
    data: {},
    isEdit: false,
    formOpen: false,
  });

  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageCount: 0,
    page: 0,
  });

  const [{ productsState, isLoading, isError, errorMessage }, setProductState] = useState({
    isLoading: false,
    isError: false,
    errorMessage: '',
    productsState: {
      products: [],
      pageSize: 5,
      pageCount: 0,
      page: 0,
    },
  });
  const { pageSize, page, pageCount } = productsState;
  console.log(productsState);
  useEffect(() => {
    // do not remove comment below

    // if (!debouncedValue.trim()) {
    //   setSearchState((prev) => ({
    //     ...prev,
    //     result: [],
    //   }));
    // } else {
    setProductState((prev) => ({ ...prev, isLoading: true }));

    getProducts([], {
      // search: debouncedValue,
      limit: pagination.pageSize,
      page: pagination.page,
      select: {
        __v: 0,
      },
    })
      .then(({ data: serverResponse }) => {
        setProductState((prev) => ({
          ...prev,
          productsState: serverResponse.data,
        }));
      })
      .catch((error) => {
        console.log(error);
        setProductState((prev) => ({
          ...prev,
          isError: true,
          errorMessage: error.response?.data.message,
        }));
      })
      .finally(() => setProductState((prev) => ({ ...prev, isLoading: false })));
    // }
  }, [pagination]);

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
    id = [id].flat(2);
    setProductState((prev) => ({
      ...prev,
      productsState: {
        ...prev.productsState,
        products: prev.productsState.products.filter((product) => !id.includes(product._id)),
        pageCount: Math.ceil((prev.productsState.total - id.length) / prev.productsState.pageSize),
        total: prev.productsState.total - id.length,
      },
    }));
  };

  const productsColumn = useMemo(() => columnProducts, [productsState]);

  //! DUMA NHỚ RETURN CUỐI CÙNG !!! (0h => 5h sáng)
  //! FUCK WHEN LOADING => Table is unmount (the same)

  const pushNewProduct = (data) => {
    setProductState((prev) => ({
      ...prev,
      productsState: {
        ...prev.productsState,
        products: [data, ...prev.productsState.products],
        pageCount: Math.ceil((prev.productsState.total + 1) / prev.productsState.pageSize),
        total: prev.productsState.total + 1,
      },
    }));
  };

  const updateProduct = (id, data) => {
    console.log(productsState.products.find((item) => item._id === id));
    setProductState((prev) => ({
      ...prev,
      productsState: {
        ...prev.productsState,
        products: prev.productsState.products.map((item) =>
          item._id === id ? { ...item, ...data } : item,
        ),
      },
    }));
  };

  return (
    <section>
      {showProductsList && !isError && (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>Admin/Products</span>
              <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
                Products List
              </h2>
            </div>
            <Button primary onClick={handleCreateProduct}>
              New Product
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <DynamicTable
              columns={productsColumn}
              products={productsState.products}
              pagination={{ pageSize, page, pageCount }}
              onPageChange={setPagination}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
            />
          </div>
        </>
      )}
      {isError && <h2>{errorMessage}</h2>}
      {currentProduct.formOpen && (
        <ProductForm
          setShowProductsList={setShowProductsList}
          onAddNewProduct={pushNewProduct}
          onUpdateProduct={updateProduct}
          setProductState={setProductState}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      )}
      {isLoading && <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />}
    </section>
  );
}
