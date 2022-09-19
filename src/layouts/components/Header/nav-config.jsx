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
    path: PATH.home,
  },
  {
    title: 'Sản phẩm',
    path: PATH.products,
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

// export const PRODUCTS_CATEGORY_LINKS = [
//   {
//     heading: 'Nhẫn',
//     path: 'ring',
//     content: [
//       {
//         title: 'Nhẫn cỡ lớn',
//         path: 'large-ring',
//       },
//       {
//         title: 'Nhẫn ngón út',
//         path: 'large-ring',
//       },
//       {
//         title: 'Nhẫn xoay',
//         path: 'large-ring',
//       },
//       {
//         title: 'Nhẫn cưới',
//         path: 'large-ring',
//       },
//     ],
//   },
//   {
//     heading: 'Dây chuyền',
//     path: 'necklace',
//     content: [
//       {
//         title: 'Dây chuyền trơn',
//         path: 'large-ring1',
//       },
//       {
//         title: 'Dây chuyền có mặt',
//         path: 'large-ring2',
//       },
//       {
//         title: 'Mặt dây chuyền',
//         path: 'large-ring3',
//       },
//     ],
//   },
//   {
//     heading: 'Bông tai',
//     path: 'earring',
//     content: [
//       {
//         title: 'Bông tai xỏ lỗ',
//         path: 'large-ring1',
//       },
//       {
//         title: 'Bông tai treo',
//         path: 'large-ring2',
//       },
//       {
//         title: 'Khuyên vành tai',
//         path: 'large-ring3',
//       },
//     ],
//   },
//   {
//     heading: 'Lắc',
//     path: 'bracelet',
//     content: [
//       {
//         title: 'Lắc tay',
//         path: 'large-ring1',
//       },
//       {
//         title: 'Lắc tay',
//         path: 'large-ring2',
//       },
//       {
//         title: 'Charm',
//         path: 'large-ring3',
//       },
//     ],
//   },
// ];

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

export const handleMenuItems = (fn) => {
  return [
    {
      title: 'Đăng nhập',
      icon: <LoginIcon />,
      path: PATH.login,
      onClick() {
        fn();
        console.log('login2');
      },
    },
    {
      title: 'Đăng ký',
      icon: <UserPlusIcon />,
      path: PATH.register,
      onClick() {
        fn();
      },
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
};

const [, , ...rest] = handleMenuItems();

export const handleMenuUserItems = ({ handleClickLogout }) => {
  const { push } = useRouter();
  return [
    {
      title: 'Tài khoản của tôi',
      icon: <UserIcon />,
      path: '/account/profile',
      onClick() {
        push(PATH.profile);
      },
    },
    {
      title: 'Thông báo của tôi',
      icon: <NotificationIcon />,
      path: '/account/profile',
    },
    {
      title: 'Đơn hàng của tôi',
      icon: <HistoryIcon />,
      path: '/account/profile',
    },
    // {
    //   title: 'Lịch sử mua hàng',
    //   icon: <HistoryIcon />,
    //   path: '/account/profile',
    // },
    {
      title: 'Sản phẩm yêu thích',
      icon: <FavoriteIcon header />,
      path: '/favorite',
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
      path: PATH.home,
      separate: true,
      onClick() {
        console.log('logout');
        handleClickLogout();
      },
    },
  ];
};
