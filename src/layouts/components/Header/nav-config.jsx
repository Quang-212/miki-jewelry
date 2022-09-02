import {
  EnglishIcon,
  FavoriteIcon,
  FeedbackIcon,
  HistoryIcon,
  LanguagesIcon,
  LogoutIcon,
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
  },
  {
    title: 'Về chúng tôi',
    path: PATH.brandHistory,
  },
];

export const PRODUCTS_CATEGORY_LINKS = [
  {
    heading: 'Nhẫn',
    path: 'ring',
    content: [
      {
        title: 'Nhẫn cỡ lớn',
        path: 'large-ring',
      },
      {
        title: 'Nhẫn ngón út',
        path: 'large-ring',
      },
      {
        title: 'Nhẫn xoay',
        path: 'large-ring',
      },
      {
        title: 'Nhẫn cưới',
        path: 'large-ring',
      },
    ],
  },
  {
    heading: 'Dây chuyền',
    path: 'necklace',
    content: [
      {
        title: 'Dây chuyền trơn',
        path: 'large-ring1',
      },
      {
        title: 'Dây chuyền có mặt',
        path: 'large-ring2',
      },
      {
        title: 'Mặt dây chuyền',
        path: 'large-ring3',
      },
    ],
  },
  {
    heading: 'Bông tai',
    path: 'earring',
    content: [
      {
        title: 'Bông tai xỏ lỗ',
        path: 'large-ring1',
      },
      {
        title: 'Bông tai treo',
        path: 'large-ring2',
      },
      {
        title: 'Khuyên vành tai',
        path: 'large-ring3',
      },
    ],
  },
  {
    heading: 'Lắc',
    path: 'bracelet',
    content: [
      {
        title: 'Lắc tay',
        path: 'large-ring1',
      },
      {
        title: 'Lắc tay',
        path: 'large-ring2',
      },
      {
        title: 'Charm',
        path: 'large-ring3',
      },
    ],
  },
];

export const MENU_ITEMS = [
  {
    title: 'Đăng ký',
    icon: <UserPlusIcon />,
    path: './profile',
  },
  {
    title: 'Góp ý và hỗ trợ',
    icon: <FeedbackIcon />,
    path: './profile',
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

const [, ...rest] = MENU_ITEMS;

export const USER_MENU_ITEMS = [
  {
    title: 'Tài khoản của tôi',
    icon: <UserIcon />,
    path: './profile',
  },
  {
    title: 'Lịch sử mua hàng',
    icon: <HistoryIcon />,
    path: './profile',
  },
  {
    title: 'Sản phẩm yêu thích',
    icon: <FavoriteIcon />,
    path: './profile',
  },
  ...rest,
  {
    title: 'Đăng xuất',
    icon: <LogoutIcon />,
    path: './profile',
    separate: true,
  },
];
