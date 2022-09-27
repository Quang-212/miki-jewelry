import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { useClientSide, useRouter } from 'src/hooks';
import { totalCartState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Calculation.module.css';

const mk = classNames.bind(styles);

export default function Calculation({ checked }) {
  const totalCart = useRecoilValue(totalCartState({ filterCartIds: checked.orders }));
  const [discountByCoupon, setDiscountByCoupon] = useState(0);
  const isClient = useClientSide();

  const { push } = useRouter();

  const handleSubmit = () => {
    const orderId = JSON.parse(sessionStorage.getItem('orders'));
    if (isEmpty(orderId)) {
      return console.log('chon di ong');
    }
    push(PATH.ORDER);
  };

  useEffect(() => {
    sessionStorage.setItem('discount', JSON.stringify(discountByCoupon));
  }, [discountByCoupon]);

  return (
    <>
      {isClient && (
        <section className={mk('calculation')}>
          <h3 className={mk('font-primary font-semibold text-2xl leading-8 text-primary')}>
            Tạm tính
          </h3>
          <div className={mk('coupon')}>
            <h5 className="col-span-3 font-primary font-bold text-xl leading-7 text-primary">
              Ưu đãi
            </h5>
            <input type="text" placeholder="Nhập mã ưu đãi" className={mk('input')} />
            <Button primary wrapper="h-12 px-2">
              Áp dụng
            </Button>
          </div>
          <NormalDivider wrapper="my-2" />
          <div className={mk('detail')}>
            <ul className={mk('titles')}>
              <li>Giá sản phẩm</li>
              <li>Phí giao hàng</li>
              <li>Giảm giá</li>
            </ul>
            <ul className={mk('prices')}>
              <li className="font-primary font-bold text-xl leading-7 text-primary">
                {formatVndCurrency(totalCart)}
              </li>
              <li className="font-primary font-bold text-xl leading-7 text-primary">50.000đ</li>
              <li className="font-primary font-bold text-xl leading-7 text-primary">
                {formatVndCurrency(discountByCoupon)}
              </li>
            </ul>
          </div>
          <NormalDivider wrapper="my-2" />
          <div className={mk('total')}>
            <h5 className="font-primary font-bold text-xl leading-7 text-primary">Tổng</h5>
            <span className="font-primary font-bold text-xl leading-7 text-primary text-primary-1">
              {formatVndCurrency(totalCart - discountByCoupon)}
            </span>
          </div>
          <Button primary onClick={handleSubmit} wrapper={mk('btn')}>
            Thanh toán
          </Button>
        </section>
      )}
    </>
  );
}
