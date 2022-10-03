import { Fragment } from 'react';
import { NormalDivider } from 'src/components/Dividers';
import { formatVndCurrency } from 'src/utils/formatNumber';
import OrderProductItem from './OrderProductItem';

export default function OrderMainInformation({ order = {} }) {
  const { products = [], provisionalPrice, shippingFee, total } = order;

  return (
    <section className="grid grid-cols-12 gap-y-8 bg-neutral-5 py-8 px-6">
      <div className="col-span-12 grid grid-cols-12">
        <span className="col-span-6">Sản phẩm</span>
        <span className="col-span-2 justify-self-center ml-4">Giá</span>
        <span className="col-span-1 justify-self-center">Số lượng</span>
        <span className="col-span-1 justify-self-center">Giảm giá</span>
        <span className="col-span-2 justify-self-center">Tạm tính</span>
      </div>

      <ul className="col-span-12 flex flex-col gap-4">
        {products.map((product) => (
          <Fragment key={product._id}>
            <OrderProductItem data={product} />
            <NormalDivider wrapper=" border-primary-5" />
          </Fragment>
        ))}
      </ul>

      <div className="col-span-12 justify-self-end mt-8 grid grid-cols-12 gap-y-4">
        <span className="col-span-6">Tạm tính</span>
        <span className="col-span-6 justify-self-end">{formatVndCurrency(provisionalPrice)}</span>
        <span className="col-span-6">Phí vận chuyển</span>
        <span className="col-span-6 justify-self-end">{formatVndCurrency(shippingFee)}</span>
        <span className="col-span-6">Tổng cộng</span>
        <span className="col-span-6 justify-self-end">{formatVndCurrency(total)}</span>
      </div>
    </section>
  );
}
