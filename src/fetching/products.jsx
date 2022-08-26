import axios from 'axios';

export const createProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/create',
    data,
    ...options,
  });
};

export const updateProduct = (data, value, options) => {
  return axios({
    method: 'PATCH',
    url: `/api/products/update?id=${value}`,
    data,
    ...options,
  });
};

export const deleteProduct = (data, options) => {
  return axios({
    method: 'POST',
    url: '/api/products/delete',
    data,
    ...options,
  });
};

const PRODUCTS_CATEGORY = [
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

// const pathsCategoryArray = PRODUCTS_CATEGORY.reduce((accumulator, value) => {
//   // accumulator.push(...[value.path, ...value.content.map((item) => item.path)]);
//   const result = [value.path, ...value.content.map((item) => item.path)];
//   accumulator = [...accumulator, ...result];
//   return accumulator;
// }, []);

// const checkSlug = (params, paths) => {
//   return paths.some((path) => params.includes(path));
// };

export const getProducts = (query, options) => {
  return axios({
    method: 'GET',
    url: `http://localhost:3000/api/products/`,
    params: query,
    ...options,
  });
};
