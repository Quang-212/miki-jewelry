import qs from 'qs';
export const PATH = {
  home: '/',
  products: '/products',
  PRODUCT_DETAIL(slug) {
    return `/products/${slug}`;
  },
  BRAND_HISTORY: '/about/brand-history',
  RECRUITMENT: '/about/recruitment',

  REGISTER: '/auth/register',
  VERIFY_EMAIL(type) {
    return `/auth/verify-email?type=${type}`; // valid type: "register" "reset-password"
  },
  LOGIN: '/auth/login',
  RESET_PASSWORD: '/auth/reset-password',
  NEW_PASSWORD(query) {
    return `/auth/new-password?${qs.stringify(query)}`;
  },

  cart: '/checkout/cart',
  ORDER: '/checkout/order',

  profile: '/account/profile',
  orders: '/account/orders',

  adminDashboard: '/admin/dashboard',
  adminProducts: '/admin/products',
  ADMIN_CUSTOMER: '/admin/customer',
  ADMIN_COUPON: '/admin/coupon',

  facebook: '/',
  twitter: '/',
  instagram: '/',
  tiktok: '/',
  pinterest: '/',

  recruitment: '/',
  purchasedHistory: '/',
  informations: '/',
  payment: '/',
  handbook: '/',
  questions: '/',

  terms: 'https://www.google.com',
};
