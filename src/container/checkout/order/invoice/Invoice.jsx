import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { NormalDivider } from 'src/components/Dividers';
import { totalCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice({ address: { provinces }, chosenOrder, chosenOrderId }) {
  const totalInvoice = useRecoilValue(totalCartState({ filterCartIds: chosenOrderId }));
  const [shippingFee, setShippingFee] = useState(0);
  const [discountByCoupon, setDiscountByCoupon] = useState(0);

  useEffect(() => {
    const generateShippingFee = (provinceCode = 9999) => {
      const FREE_SHIPPING_POINT = 500000;
      const DEFAULT_SHIPPING_FEE = 50000;
      const DOMESTIC_SHIPPING_FEE = 20000;

      switch (provinceCode) {
        case 1: //Hà nội
        case 79: //Sài Gòn
          return totalInvoice >= FREE_SHIPPING_POINT ? 0 : DOMESTIC_SHIPPING_FEE;
        default:
          return totalInvoice >= FREE_SHIPPING_POINT ? DOMESTIC_SHIPPING_FEE : DEFAULT_SHIPPING_FEE;
      }
    };

    setShippingFee(generateShippingFee(provinces));
  }, [provinces]);

  const totalPrice = totalInvoice + shippingFee - discountByCoupon;

  useEffect(() => {
    setDiscountByCoupon(JSON.parse(sessionStorage.getItem('discount')) || 0);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('provisionalPrice', JSON.stringify(totalInvoice));
    sessionStorage.setItem('shippingFee', JSON.stringify(shippingFee));
    sessionStorage.setItem('total', JSON.stringify(totalPrice < 0 ? 0 : totalPrice));
  }, [totalPrice, totalInvoice, shippingFee]);

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
          <li>Phí giao hàng tạm tính</li>
          <li>Giảm giá</li>
        </ul>
        <ul className={mk('prices')}>
          <li className="font-primary font-bold text-xl leading-7 text-primary">
            {formatVndCurrency(totalInvoice)}
          </li>
          <li className="font-primary font-bold text-xl leading-7 text-primary">
            {formatVndCurrency(shippingFee)}
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
