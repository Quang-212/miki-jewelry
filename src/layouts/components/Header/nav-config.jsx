import { PATH } from 'src/routes';
import {
  CommentIcon,
  DashboardIcon,
  EnglishIcon,
  FavoriteIcon,
  FeedbackIcon,
  HistoryIcon,
  LanguagesIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
  UserPlusIcon,
  VietnameseIcon,
} from 'src/components/Icons';

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
    path: PATH.PRODUCT_CATEGORY('ring'),
    content: [
      {
        title: 'Nhẫn cỡ lớn',
        path: PATH.PRODUCT_CATEGORY('ring'),
      },
      {
        title: 'Nhẫn ngón út',
        path: PATH.PRODUCT_CATEGORY('ring'),
      },
      {
        title: 'Nhẫn xoay',
        path: PATH.PRODUCT_CATEGORY('ring'),
      },
      {
        title: 'Nhẫn cưới',
        path: PATH.PRODUCT_CATEGORY('ring'),
      },
    ],
  },
  {
    heading: 'Dây chuyền',
    path: PATH.PRODUCT_CATEGORY('necklace'),
    content: [
      {
        title: 'Dây chuyền trơn',
        path: PATH.PRODUCT_CATEGORY('necklace'),
      },
      {
        title: 'Dây chuyền có mặt',
        path: PATH.PRODUCT_CATEGORY('necklace'),
      },
      {
        title: 'Mặt dây chuyền',
        path: PATH.PRODUCT_CATEGORY('necklace'),
      },
    ],
  },
  {
    heading: 'Bông tai',
    path: PATH.PRODUCT_CATEGORY('earring'),
    content: [
      {
        title: 'Bông tai xỏ lỗ',
        path: PATH.PRODUCT_CATEGORY('earring'),
      },
      {
        title: 'Bông tai treo',
        path: PATH.PRODUCT_CATEGORY('earring'),
      },
      {
        title: 'Khuyên vành tai',
        path: PATH.PRODUCT_CATEGORY('earring'),
      },
    ],
  },
  {
    heading: 'Lắc',
    path: PATH.PRODUCT_CATEGORY('bracelet'),
    content: [
      {
        title: 'Lắc tay',
        path: PATH.PRODUCT_CATEGORY('bracelet'),
      },
      {
        title: 'Lắc tay',
        path: PATH.PRODUCT_CATEGORY('bracelet'),
      },
      {
        title: 'Charm',
        path: PATH.PRODUCT_CATEGORY('bracelet'),
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

export const MENU_ITEMS = [];

const rest = MENU_ITEMS.slice(2);

export const MENU_USER_ITEMS = ({ handleClickLogout, currentAuthState }) => {
  const { user, isAuthenticated } = currentAuthState;

  return [
    ...(user.role === 'admin' && isAuthenticated
      ? [
          {
            title: 'Dashboard',
            icon: <DashboardIcon />,
            path: PATH.ADMIN_DASHBOARD,
          },
        ]
      : []),
    ...(isAuthenticated
      ? [
          {
            title: 'Tài khoản của tôi',
            icon: <UserIcon />,
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
        ]
      : []),
    ...(!isAuthenticated
      ? [
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
        ]
      : []),
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
    ...(isAuthenticated
      ? [
          {
            title: 'Thoát tài khoản',
            icon: <LogoutIcon />,
            path: PATH.HOME,
            separate: true,
            onClick: handleClickLogout,
          },
        ]
      : []),
  ];
};
