import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { NormalDivider } from 'src/components/Dividers';
import { cartState, totalCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice() {
  const [chosenOrderId, setChosenOrderId] = useState([]);

  const cart = useRecoilValue(cartState);

  const totalCart = useRecoilValue(totalCartState);

  useEffect(() => {
    setChosenOrderId(JSON.parse(sessionStorage.getItem('orders')));
  }, [cart]);

  const chosenOrder = cart.filter((cartItem) => chosenOrderId.includes(cartItem.cartId));

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
          <li className="heading-5">{formatVndCurrency(totalCart)}</li>
          <li className="heading-5">40.000đ</li>
          <li className="heading-5">200.000đ</li>
        </ul>
      </div>
      <NormalDivider wrapper={mk('divider-2')} />
      <div className={mk('total')}>
        <h5 className="heading-5">Tổng</h5>
        <span className="heading-5">1.637.000đ</span>
      </div>
    </section>
  );
}
