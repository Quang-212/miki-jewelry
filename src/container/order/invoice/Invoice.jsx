import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { NormalDivider } from 'src/components/Dividers';
import { totalCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice({ address: { provinces }, chosenOrder, chosenOrderId }) {
  const totalInvoice = useRecoilValue(totalCartState({ filterCartIds: chosenOrderId }));
  const generateShippingFee = (provinceCode = 9999) => {
    const FREE_SHIPPING_POINT = 500000;
    const DEFAULT_SHIPPING_FEE = 50000;
    const DOMESTIC_SHIPPING_FEE = 20000;

    switch (provinceCode) {
      case 1: //Hà nội
      case 79: //Sài Gòn
        return totalInvoice >= FREE_SHIPPING_POINT ? 0 : DOMESTIC_SHIPPING_FEE;
      default:
        return DEFAULT_SHIPPING_FEE;
    }
  };
  const discountByCoupon = 200000;

  const totalPrice = totalInvoice - discountByCoupon + generateShippingFee(provinces);

  useEffect(() => {
    sessionStorage.setItem('total', JSON.stringify(totalPrice < 0 ? 0 : totalPrice));
  }, [totalPrice]);

  return (
    <section className={mk('invoice')}>
      <ul className={mk('invoice-list')}>
        {chosenOrder.map((order) => (
          <li key={order._id}>
            <InvoiceItem data={order} />
          </li>
        ))}
      </ul>
      <NormalDivider wrapper={mk('divider-1')} />
      <div className={mk('detail')}>
        <ul className={mk('title-list')}>
          <li>Giá sản phẩm</li>
          <li>Phí giao hàng</li>
          <li>Giảm giá</li>
        </ul>
        <ul className={mk('prices')}>
          <li className="font-primary font-bold text-xl leading-7 text-primary">
            {formatVndCurrency(totalInvoice)}
          </li>
          <li className="font-primary font-bold text-xl leading-7 text-primary">
            {formatVndCurrency(generateShippingFee(provinces))}
          </li>
          <li className="font-primary font-bold text-xl leading-7 text-primary">
            {formatVndCurrency(discountByCoupon)}
          </li>
        </ul>
      </div>
      <NormalDivider wrapper={mk('divider-2')} />
      <div className={mk('total')}>
        <h5 className="font-primary font-bold text-xl leading-7 text-primary">Tổng</h5>
        <span className="font-primary font-bold text-xl leading-7 text-primary">
          {formatVndCurrency(totalPrice < 0 ? 0 : totalPrice)}
        </span>
      </div>
    </section>
  );
}
