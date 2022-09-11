import { PATH } from 'src/routes';

export const navConfig = [
  {
    subheader: 'dashboard',
    items: [
      {
        title: 'App',
        icon: 'icon',
        path: PATH.adminDashboard,
      },
      {
        title: 'Products',
        icon: 'icon',
        path: PATH.adminProducts,
      },
    ],
  },

  {
    subheader: 'management',
    items: [
      {
        title: 'User',
        icon: 'icon',
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
        icon: 'icon',
        path: PATH.adminProducts,
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
