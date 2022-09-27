import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { LoadingRotatingLines } from 'src/components/Loadings';
import DynamicTable from 'src/components/Tables/DynamicTable';
import { deleteProduct } from 'src/fetching/products';
import { useProducts } from 'src/hooks';
import useCoupon from 'src/hooks/useCoupon';
import { fDate } from 'src/utils/formartTime';
import { CouponForm } from '../coupon-form';
import { columnCoupon } from './columns-config';

export function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState({
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

  const { couponState } = useCoupon({
    limit,
    pageIndex,
  });

  const _coupons = couponState;

  const handleCreateProduct = () => {
    setCurrentCoupon({
      data: {},
      isEdit: false,
      formOpen: true,
    });
  };

  const handleEditProduct = (product) => {
    setCurrentCoupon({
      data: product,
      isEdit: true,
      formOpen: true,
    });
    // setShowProductsList((prev) => !prev);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct({ id }, { params: { type: Array.isArray(id) ? 'many' : 'one' } });
    id = [id].flat(Infinity);
    setCoupons((prev) => prev.filter((product) => !id.includes(product._id)));
  };

  useEffect(() => {
    _coupons && setCoupons(_coupons);
    _coupons &&
      setPagination((prev) => ({ ...prev, pageCount: Math.ceil(couponState.total / limit) }));
  }, [_coupons, limit]);

  const productsColumn = useMemo(() => columnCoupon, [coupons]);
  const productsData = useMemo(
    () =>
      coupons.map((item) => ({
        ...item,
        startDate: fDate(item.startDate),
        endDate: fDate(item.startDate),
      })),
    [coupons],
  );

  if (isError) return <h2>{isError}</h2>;
  //! DUMA NHỚ RETURN CUỐI CÙNG !!! (0h => 5h sáng)
  //! FUCK WHEN LOADING => Table is unmount (the same)
  if (isLoading) return <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />;

  return (
    <section>
      {!currentCoupon.formOpen && (
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
              data={productsData}
              onPageChange={setPagination}
              pageState={{ limit, pageCount, pageIndex }}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
            />
          </div>
        </>
      )}
      {currentCoupon.formOpen && (
        <CouponForm currentCoupon={currentCoupon} setCurrentCoupon={setCurrentCoupon} />
      )}
    </section>
  );
}
