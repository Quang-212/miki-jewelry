import { BasketIcon, FavoriteIcon, UserIcon } from 'src/components/Icons';
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

export const navCta = [
  {
    icon: <BasketIcon />,
    path: PATH.home,
  },
  {
    icon: <UserIcon />,
    path: PATH.login,
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
