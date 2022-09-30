import qs from 'qs';

export const PATH = {
  HOME: '/',
  PRODUCTS: '/products',
  BRAND_HISTORY: '/about/brand-history',
  RECRUITMENT: '/about/recruitment',

  PRODUCT_CATEGORY(category) {
    return `/products?category=${category}`;
  },
  PRODUCT_DETAIL(slug) {
    return `/products/${slug}`;
  },

  REGISTER: '/auth/register',
  VERIFY_EMAIL(type) {
    return `/auth/verify-email?type=${type}`; // valid type: "register" "reset-password"
  },
  LOGIN: '/auth/login',
  RESET_PASSWORD: '/auth/reset-password',
  NEW_PASSWORD(query) {
    return `/auth/new-password?${qs.stringify(query)}`;
  },

  CART: '/checkout/cart',
  ORDER: '/checkout/order',

  PROFILE: '/account/profile',
  ORDERS: '/account/orders',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
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

  TERMS: 'https://www.google.com',
};
