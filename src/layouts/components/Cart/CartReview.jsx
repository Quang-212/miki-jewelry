import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { images } from 'src/constants';
import { useRouter } from 'src/hooks';
import { totalCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Cart.module.css';
import CartReviewItem from './CartReviewItem';

const mk = classNames.bind(styles);

export default function CartReview({ cartRecoil, children }) {
  const totalCart = useRecoilValue(totalCartState({ totalCart: true }));
  const totalPrice = formatVndCurrency(totalCart);

  const { push } = useRouter();

  const handleCheckout = async () => {
    sessionStorage.setItem('orders', JSON.stringify(cartRecoil.map((cartItem) => cartItem._id)));
    push('/checkout/order');
  };

  const renderCartReview = (attrs) => {
    return (
      <div className="w-[480px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className={mk('popper-wrapper')}>
          {!isEmpty(cartRecoil) ? (
            <>
              <h5 className="mt-4 font-primary font-bold text-xl leading-7 text-primary">
                Giỏ hàng
              </h5>
              <NormalDivider />
              <ul className={mk('cart-review-list')}>
                {cartRecoil.map((cartItem) => (
                  <li key={cartItem._id}>
                    <CartReviewItem data={cartItem} />
                  </li>
                ))}
              </ul>
              <NormalDivider />
              <div className={mk('cart-review-handle')}>
                <p className="text-xl">Tổng tiền:</p>
                <span className={mk('cart-review-price')}>{totalPrice}</span>
                <Button outline internalLink="/checkout/cart">
                  Xem giỏ hàng
                </Button>
                <Button primary onClick={handleCheckout}>
                  Thanh toán
                </Button>
              </div>
            </>
          ) : (
            <div className={mk('cart-review-empty')}>
              <Image src={images.adminAvatar} alt="Ảnh giỏ hàng trống" width={200} height={200} />
              <p>Hiện chưa có sản phẩm</p>
              <Button primary internalLink="/products">
                Mua ngay
              </Button>
            </div>
          )}
        </PopperWrapper>
      </div>
    );
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[200, 400]}
      offset={[144, 16]}
      render={renderCartReview}
    >
      {children}
    </Tippy>
  );
}
