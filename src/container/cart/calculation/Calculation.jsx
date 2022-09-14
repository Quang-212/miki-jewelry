import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';
import Button from 'src/components/Button';

import { NormalDivider } from 'src/components/Dividers';
import { useClientSide, useRouter } from 'src/hooks';
import { totalCartState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Calculation.module.css';

const mk = classNames.bind(styles);

export default function Calculation() {
  const totalCart = useRecoilValue(totalCartState);

  const isClient = useClientSide();

  const { push } = useRouter();

  const priceByDiscount = () => {
    return 0;
  };

  return (
    <>
      {isClient && (
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
              <li className="heading-5">{formatVndCurrency(totalCart)}</li>
              <li className="heading-5">50.000đ</li>
              <li className="heading-5">{formatVndCurrency(priceByDiscount())}</li>
            </ul>
          </div>
          <NormalDivider wrapper="my-2" />
          <div className={mk('total')}>
            <h5 className="heading-5">Tổng</h5>
            <span className="heading-5 text-primary-1">
              {formatVndCurrency(totalCart - priceByDiscount())}
            </span>
          </div>
          <Button primary internalLink={PATH.ORDER} wrapper={mk('btn')}>
            Thanh toán
          </Button>
        </section>
      )}
    </>
  );
}
