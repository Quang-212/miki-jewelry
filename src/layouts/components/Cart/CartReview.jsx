import Tippy from '@tippyjs/react/headless';
import { isEmpty } from 'lodash';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { images } from 'src/constants';
import { totalCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import CartReviewItem from './CartReviewItem';
import styles from './Cart.module.css';
import { PATH } from 'src/routes';

const mk = classNames.bind(styles);

export default function CartReview({ cart, cartRecoil, children }) {
  const totalCart = useRecoilValue(totalCartState);
  const totalPrice = formatVndCurrency(totalCart);

  const renderCartReview = (attrs) => {
    return (
      <div className="w-[480px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className={mk('popper-wrapper')}>
          {!isEmpty(cart) ? (
            <>
              <h5 className="mt-4 heading-5">Giỏ hàng</h5>
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
                <Button primary internalLink={PATH.ORDER}>
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
      offset={[108, 16]}
      render={renderCartReview}
    >
      {children}
    </Tippy>
  );
}
