import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Badge from 'src/components/Badge';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { images } from 'src/constants';
import useNotifications from 'src/hooks/useNotifications';
import usePusherClient from 'src/hooks/usePusherClient';
import { userState } from 'src/recoils';
import NotificationReviewItem from './NotificationReviewItem';
import styles from './Notifications.module.css';

const mk = classNames.bind(styles);

export default function NotificationsReview({ children }) {
  const { user, isAuthenticated } = useRecoilValue(userState);

  const [notifications, setNotifications] = useState({
    data: [],
    unRead: 0,
  });

  const { data } = useNotifications({
    userId: user._id,
    page: 0,
    limit: 4,
  });

  const pusher = usePusherClient();

  console.log(data);

  useEffect(() => {
    !isEmpty(data?.notifications) &&
      setNotifications({ data: data.notifications, unRead: data.unRead });
  }, [data]);

  useEffect(() => {
    if (pusher && isAuthenticated && user.role === 'admin') {
      const adminChannel = pusher.subscribe('admin');
      adminChannel.bind('order', (newOrder) => {
        setNotifications((prev) => ({ data: [newOrder, ...prev.data], unRead: prev.unRead + 1 }));
      });

      adminChannel.bind('feedback', (newFeedback) => {
        setNotifications((prev) => ({
          data: [newFeedback, ...prev.data],
          unRead: prev.unRead + 1,
        }));
      });
    }
  }, [pusher, user, isAuthenticated]);

  const renderNotificationsReview = (attrs) => {
    return (
      <div className="w-[500px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className={mk('popper-wrapper')}>
          {!isEmpty(data?.notifications) ? (
            <>
              <h5 className="px-4 font-primary font-bold text-xl leading-7 text-primary">
                Thông báo của tôi
              </h5>
              <div className="flex justify-between px-4">
                <p className="">Bạn có {notifications.unRead} tin nhắn chưa đọc</p>
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
                {notifications.data.map((item) => (
                  <li key={item._id}>
                    <NotificationReviewItem data={item} />
                  </li>
                ))}
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
            </div>
          )}
        </PopperWrapper>
      </div>
    );
  };

  return (
    <Badge badgeContent={notifications.unRead || 0} wrapper="ml-4">
      <Tippy
        interactive
        placement="bottom-end"
        delay={[200, 400]}
        offset={[108, 16]}
        render={renderNotificationsReview}
      >
        {children}
      </Tippy>
    </Badge>
  );
}
