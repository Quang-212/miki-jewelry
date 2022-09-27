import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { images } from 'src/constants';
import NotificationReviewItem from './NotificationReviewItem';
import styles from './Notifications.module.css';

const mk = classNames.bind(styles);

export default function NotificationsReview({ cartRecoil, children }) {
  // const totalCart = useRecoilValue(totalCartState({ totalCart: true }));
  // const totalPrice = formatVndCurrency(totalCart);

  // const { push } = useRouter();

  // const handleCheckout = async () => {
  //   sessionStorage.setItem('orders', JSON.stringify(cartRecoil.map((cartItem) => cartItem._id)));
  //   push('/checkout/order');
  // };

  const renderNotificationsReview = (attrs) => {
    return (
      <div className="w-[500px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className={mk('popper-wrapper')}>
          {true ? (
            <>
              <h5 className="px-4 font-primary font-bold text-xl leading-7 text-primary">
                Thông báo của tôi
              </h5>
              <div className="flex justify-between px-4">
                <p className="">Bạn có 4 tin nhắn chưa đọc</p>
                <Button
                  text
                  wrapper="col-span-5 justify-self-end"
                  title="text-caption-2 font-semibold hover:opacity-80"
                >
                  Đánh dấu tất cả đã đọc
                </Button>
              </div>
              <NormalDivider />
              <ul className="flex flex-col gap-2 max-h-[400px] divide-y-[1.5px] divide-dashed overflow-y-scroll">
                <li>
                  <NotificationReviewItem />
                </li>
                <li>
                  <NotificationReviewItem />
                </li>
                <li>
                  <NotificationReviewItem />
                </li>
                <li>
                  <NotificationReviewItem />
                </li>
                <li>
                  <NotificationReviewItem />
                </li>
              </ul>
              <NormalDivider />
              <div className="flex justify-center">
                <Button text title="font-semibold hover:opacity-80">
                  Xem tất cả
                </Button>
              </div>
            </>
          ) : (
            <div className={mk('notifications-review-empty')}>
              <Image src={images.adminAvatar} alt="Ảnh giỏ hàng trống" width={200} height={200} />
              <p>Hiện chưa có thông báo</p>
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
      render={renderNotificationsReview}
    >
      {children}
    </Tippy>
  );
}
