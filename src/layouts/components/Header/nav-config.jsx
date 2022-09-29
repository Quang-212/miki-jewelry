import { useRouter } from 'next/router';
import {
  CommentIcon,
  EnglishIcon,
  FavoriteIcon,
  FeedbackIcon,
  HistoryIcon,
  LanguagesIcon,
  LoginIcon,
  LogoutIcon,
  NotificationIcon,
  UserIcon,
  UserPlusIcon,
  VietnameseIcon,
} from 'src/components/Icons';
import { PATH } from 'src/routes';

export const NAVIGATION_LINKS = [
  {
    title: 'Trang chủ',
    path: PATH.HOME,
  },
  {
    title: 'Sản phẩm',
    path: PATH.PRODUCTS,
    link: 'category',
  },
  {
    title: 'Về chúng tôi',
    path: PATH.BRAND_HISTORY,
    link: 'about',
  },
];

export const PRODUCTS_CATEGORY_LINKS = [
  {
    heading: 'Nhẫn',
    path: '/products',
    content: [
      {
        title: 'Nhẫn cỡ lớn',
        path: '/products',
      },
      {
        title: 'Nhẫn ngón út',
        path: '/products',
      },
      {
        title: 'Nhẫn xoay',
        path: '/products',
      },
      {
        title: 'Nhẫn cưới',
        path: '/products',
      },
    ],
  },
  {
    heading: 'Dây chuyền',
    path: '/products',
    content: [
      {
        title: 'Dây chuyền trơn',
        path: '/products',
      },
      {
        title: 'Dây chuyền có mặt',
        path: '/products',
      },
      {
        title: 'Mặt dây chuyền',
        path: '/products',
      },
    ],
  },
  {
    heading: 'Bông tai',
    path: '/products',
    content: [
      {
        title: 'Bông tai xỏ lỗ',
        path: '/products',
      },
      {
        title: 'Bông tai treo',
        path: '/products',
      },
      {
        title: 'Khuyên vành tai',
        path: '/products',
      },
    ],
  },
  {
    heading: 'Lắc',
    path: '/products',
    content: [
      {
        title: 'Lắc tay',
        path: '/products',
      },
      {
        title: 'Lắc tay',
        path: '/products',
      },
      {
        title: 'Charm',
        path: '/products',
      },
    ],
  },
];

export const ABOUT_LINKS = [
  {
    title: 'Thương hiệu và lịch sử',
    path: PATH.BRAND_HISTORY,
  },
  {
    title: 'Tuyển dụng',
    path: PATH.RECRUITMENT,
  },
];

export const MENU_ITEMS = [
  {
    title: 'Đăng nhập',
    icon: <LoginIcon />,
    path: PATH.LOGIN,
  },
  {
    title: 'Đăng ký',
    icon: <UserPlusIcon />,
    path: PATH.REGISTER,
  },
  {
    title: 'Góp ý và hỗ trợ',
    icon: <FeedbackIcon />,
    path: '/account/profile',
  },
  {
    title: 'Tiếng việt',
    icon: <LanguagesIcon />,
    children: {
      title: 'Languages',
      data: [
        {
          type: 'languages',
          code: 'en',
          title: 'English',
          icon: <EnglishIcon />,
        },
        {
          type: 'languages',
          code: 'vi',
          title: 'Tiếng việt',
          icon: <VietnameseIcon />,
        },
      ],
    },
  },
];

const [, , ...rest] = MENU_ITEMS;

export const MENU_USER_ITEMS = ({ handleClickLogout }) => {
  return [
    {
      title: 'Tài khoản của tôi',
      icon: <UserIcon />,
      path: '/account/profile',
    },
    {
      title: 'Thông báo của tôi',
      icon: <NotificationIcon />,
      path: '/account/profile',
    },
    {
      title: 'Đơn hàng của tôi',
      icon: <HistoryIcon />,
      path: '/account/orders',
    },
    {
      title: 'Sản phẩm yêu thích',
      icon: <FavoriteIcon header />,
      path: '/account/favorite',
    },
    {
      title: 'Nhận xét sản phẩm',
      icon: <CommentIcon />,
      path: '/favorite',
    },
    ...rest,
    {
      title: 'Thoát tài khoản',
      icon: <LogoutIcon />,
      path: PATH.HOME,
      separate: true,
      onClick() {
        handleClickLogout();
      },
    },
  ];
};
