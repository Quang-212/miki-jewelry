import classNames from 'classnames/bind';

import { NormalDivider } from 'src/components/Dividers';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice() {
  return (
    <section className={mk('invoice')}>
      <ul className={mk('invoice-list')}>
        <li>
          <InvoiceItem />
        </li>
        <li>
          <InvoiceItem />
        </li>
        <li>
          <InvoiceItem />
        </li>
      </ul>
      <NormalDivider wrapper={mk('divider-1')} />
      <div className={mk('detail')}>
        <ul className={mk('title-list')}>
          <li>Giá sản phẩm</li>
          <li>Phí giao hàng</li>
          <li>Giảm giá</li>
        </ul>
        <ul className={mk('prices')}>
          <li className="heading-5">1.797.000đ</li>
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
