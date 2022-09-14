import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { NormalDivider } from 'src/components/Dividers';
import { cartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice({ address: { provinces } }) {
  const [chosenOrderId, setChosenOrderId] = useState([]);

  const cart = useRecoilValue(cartState);

  useEffect(() => {
    setChosenOrderId(JSON.parse(sessionStorage.getItem('orders')));
  }, [cart]);

  const chosenOrder = cart.filter((cartItem) => chosenOrderId.includes(cartItem.cartId));

  const pricePerProduct = (cartItem) => {
    return cartItem.product.stocks.find((stock) => stock.size == cartItem.size).price;
  };

  const totalInvoice = chosenOrder.reduce((total, item) => {
    return (total += pricePerProduct(item) * item.quantity);
  }, 0);

  const shippingFee = (provinceCode = 9999) => {
    const freeShippingPoint = 500000;
    const defaultShippingFee = 50000;
    const domesticShippingFee = 20000;
    switch (provinceCode) {
      case 1:
      case 79:
        return totalInvoice >= freeShippingPoint ? 0 : domesticShippingFee;
      default:
        return defaultShippingFee;
    }
  };

  const discountByCoupon = 200000;

  return (
    <section className={mk('invoice')}>
      <ul className={mk('invoice-list')}>
        {chosenOrder.map((order) => (
          <li key={order.cartId}>
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
          <li className="heading-5">{formatVndCurrency(totalInvoice)}</li>
          <li className="heading-5">{formatVndCurrency(shippingFee(provinces))}</li>
          <li className="heading-5">{formatVndCurrency(discountByCoupon)}</li>
        </ul>
      </div>
      <NormalDivider wrapper={mk('divider-2')} />
      <div className={mk('total')}>
        <h5 className="heading-5">Tổng</h5>
        <span className="heading-5">
          {formatVndCurrency(totalInvoice - (discountByCoupon + shippingFee(provinces)))}
        </span>
      </div>
    </section>
  );
}
