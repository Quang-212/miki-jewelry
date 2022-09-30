import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { motion, useSpring } from 'framer-motion';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import 'tippy.js/dist/tippy.css';

import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ToggleButton from 'src/components/ToggleButton';
import { images } from 'src/constants';
import { markAsReadNotification, updateNotification } from 'src/fetching/notification';
import useNotifications from 'src/hooks/useNotifications';
import usePusherClient from 'src/hooks/usePusherClient';
import { userState } from 'src/recoils';
import NotificationPreviewItem from './NotificationPreviewItem';
import styles from './Notifications.module.css';

const mk = classNames.bind(styles);

export default function NotificationsPreview({ children }) {
  const [enabled, setEnabled] = useState(false);

  const [notifications, setNotifications] = useState({
    data: [],
    unRead: 0,
  });

  const { user, isAuthenticated } = useRecoilValue(userState);

  const { data } = useNotifications({
    userId: user._id,
    page: 0,
    limit: 4,
    show_hidden: enabled,
  });

  const pusher = usePusherClient();

  useEffect(() => {
    setNotifications(() => {
      if (!isAuthenticated || isEmpty(data?.notifications)) {
        return { data: [], unRead: 0 };
      }

      return { data: data.notifications, unRead: data.unRead };
    });
  }, [data, isAuthenticated]);

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

  const handleMarkAsRead = async (id) => {
    try {
      await markAsReadNotification({ id }, { params: { type: 'one' } });

      notifications.unRead > 0 &&
        setNotifications((prev) => ({
          ...prev,
          unRead: prev.unRead - 1,
          data: prev.data.map((item) => (item._id === id ? { ...item, read: true } : item)),
        }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAsReadNotification(
        { id: notifications.data.map((item) => item._id) },
        { params: { type: 'many' } },
      );

      setNotifications((prev) => ({
        ...prev,
        unRead: 0,
        data: prev.data.map((item) => ({ ...item, read: true })),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleHideNotification = async (id) => {
    try {
      await updateNotification({ read: true, deleted: true }, { params: { id } });
      setNotifications((prev) => ({
        unRead: prev.unRead + (prev.data.find((item) => item._id === id).read ? 0 : -1),
        data: prev.data.map((item) =>
          item._id === id ? { ...item, read: true, deleted: true } : item,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowNotification = async (id) => {
    try {
      await updateNotification({ deleted: false }, { params: { id } });
      setNotifications((prev) => ({
        ...prev,
        data: prev.data.map((item) => (item._id === id ? { ...item, deleted: false } : item)),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const springConfig = { damping: 40, stiffness: 400 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  const renderNotificationsReview = (attrs) => {
    return (
      <motion.div className="w-[486px]" tabIndex="-1" style={{ scale, opacity }} {...attrs}>
        <PopperWrapper className={mk('popper-wrapper')}>
          {!isEmpty(data?.notifications) ? (
            <>
              <div className="flex justify-between">
                <h5 className="px-4 font-primary font-bold text-xl leading-7 text-primary">
                  Thông báo của tôi
                </h5>
                <Tippy content={<span>{enabled ? 'Ẩn' : 'Hiện'} thông báo ẩn</span>}>
                  <div>
                    <ToggleButton enabled={enabled} setEnabled={setEnabled} />
                  </div>
                </Tippy>
              </div>
              <div className="flex justify-between px-4">
                <p className="">Bạn có {notifications.unRead} tin nhắn chưa đọc</p>
                <Button
                  text
                  onClick={handleMarkAllAsRead}
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
                    <NotificationPreviewItem
                      data={item}
                      enabled={enabled}
                      onMarkAsRead={handleMarkAsRead}
                      onHide={handleHideNotification}
                      onShow={handleShowNotification}
                    />
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
              <Image src={images.emptyCart} alt="Ảnh giỏ hàng trống" width={300} height={220} />
              <p>Hiện chưa có thông báo</p>
            </div>
          )}
        </PopperWrapper>
      </motion.div>
    );
  };

  return (
    <Badge badgeContent={notifications.unRead || 0} wrapper="ml-4">
      <HeadlessTippy
        interactive
        placement="bottom-end"
        delay={[200, 400]}
        offset={[64, 16]}
        render={renderNotificationsReview}
        animation={true}
        onMount={onMount}
        onHide={onHide}
      >
        {children}
      </HeadlessTippy>
    </Badge>
  );
}
