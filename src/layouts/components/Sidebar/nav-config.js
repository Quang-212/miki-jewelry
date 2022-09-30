import { PATH } from 'src/routes';

export const navConfig = [
  {
    subheader: 'dashboard',
    items: [
      {
        title: 'App',
        icon: 'ant-design:bell-filled',
        path: PATH.ADMIN_DASHBOARD,
      },
      {
        title: 'Products',
        icon: 'ant-design:bell-filled',
        path: PATH.ADMIN_PRODUCTS,
      },
      {
        title: 'Customer',
        icon: 'ant-design:bell-filled',
        path: PATH.ADMIN_CUSTOMER,
      },
      {
        title: 'Coupon',
        icon: 'ant-design:bell-filled',
        path: PATH.ADMIN_COUPON,
      },
    ],
  },

  {
    subheader: 'management',
    items: [
      {
        title: 'User',
        icon: 'ant-design:bell-filled',
        children: [
          {
            title: 'profile',
            path: '/admin/user/profile',
          },
          {
            title: 'create',
            path: '/admin/user/create',
          },
          {
            title: 'cards',
            path: '/admin/user/cards',
          },
          {
            title: 'edit',
            path: '/admin/user/edit',
          },
        ],
      },
      {
        title: 'Blog',
        icon: 'ant-design:bell-filled',
        path: PATH.ADMIN_PRODUCTS,
        children: [
          {
            title: 'profile',
            path: '/admin/profile',
          },
          {
            title: 'create',
            path: '/admin/create',
          },
          {
            title: 'cards',
            path: '/admin/cards',
          },
          {
            title: 'edit',
            path: '/admin/edit',
          },
        ],
      },
    ],
  },
];
