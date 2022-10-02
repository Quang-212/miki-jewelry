import {
  CommentIcon,
  CouponIcon,
  FavoriteIcon,
  OrdersIcon,
  UserIcon,
  ViewedProductsIcon,
} from 'src/components/Icons';
import { PATH } from 'src/routes';

export const NAV_USER_ITEMS = [
  {
    title: 'Thông tin tài khoản',
    icon: <UserIcon />,
    path: PATH.PROFILE,
  },
  {
    title: 'Quản lý đơn hàng',
    icon: <OrdersIcon />,
    path: PATH.ORDERS,
  },
  {
    title: 'Đánh giá sản phẩm',
    icon: <CommentIcon />,
    path: PATH.REVIEWS,
  },
  {
    title: 'Sản phẩm đã xem',
    icon: <ViewedProductsIcon />,
    path: PATH.VIEWED_PRODUCTS,
  },
  {
    title: 'Sản phẩm yêu thích',
    icon: <FavoriteIcon header />,
    path: PATH.FAVORITES,
  },
  {
    title: 'Mã giảm giá',
    icon: <CouponIcon />,
    path: PATH.COUPONS,
  },
];
