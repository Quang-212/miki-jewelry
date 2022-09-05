import classNames from 'classnames/bind';
import Button from 'src/components/Button';

import { NormalDivider } from 'src/components/Dividers';
import styles from './Calculation.module.css';

const mk = classNames.bind(styles);

export default function Calculation() {
  return (
    <section className={mk('calculation')}>
      <h3 className={mk('heading-3')}>Tạm tính</h3>
      <div className={mk('coupon')}>
        <h5 className="heading-5">Ưu đãi</h5>
        <input type="text" placeholder="Nhập ưu đãi" className={mk('input')} />
      </div>
      <NormalDivider wrapper="my-2" />
      <div className={mk('detail')}>
        <ul className={mk('titles')}>
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
      <NormalDivider wrapper="my-2" />
      <div className={mk('total')}>
        <h5 className="heading-5">Tổng</h5>
        <span className="heading-5 text-primary-1">1.637.000đ</span>
      </div>
      <Button primary wrapper={mk('btn')}>
        Thanh toán
      </Button>
    </section>
  );
}
