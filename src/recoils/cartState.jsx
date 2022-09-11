import { atom, selector } from 'recoil';

import persistAtom from 'src/utils/recoilPersist';

export const cartState = atom({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// export const addToCartState = selector({
//   key: 'addToCart',
//   get: ({ get }) => get(cartState),
//   set: ({ set, get }, newProduct) => {
//     const prevCart = get(cartState);
//     const existedProduct = prevCart.find((product) => product._id === newProduct._id);

//     return set(
//       cartState,
//       existedProduct
//         ? prevCart.map((product) =>
//             product._id === newProduct._id
//               ? { ...product, quantity: product.quantity + 1 }
//               : product,
//           )
//         : [...prevCart, { product: newProduct, quantity: 1 }],
//     );
//   },
// });

// export const updateCartState = selector({
//   key: 'updateCart',
//   get: ({ get }) => get(cartState),
//   set: ({ set, get }, currentProduct, type, quantity) => {
//     const prevCart = get(cartState);

//     return set(
//       cartState,
//       prevCart.map((product) =>
//         product._id === currentProduct._id
//           ? { ...product, quantity: type === 'subtract' ? product.quantity - 1 : quantity }
//           : product,
//       ),
//     );
//   },
// });

export const addToCartState = selector({
  key: 'addToCart',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, currentProduct, type, quantity) => {
    const prevCart = get(cartState);
    const existedProduct = prevCart.find((product) => product._id === currentProduct._id);

    const calculateQuantity = (type, quantity) => {
      if (type === 'typing') {
        return quantity;
      }
      return type === 'subtract' ? quantity - 1 : quantity + 1;
    };

    const updateCart = (prevCart, currentProduct, type, quantity) => {
      return prevCart.map((product) =>
        product._id === currentProduct._id
          ? { ...product, quantity: calculateQuantity(type, quantity) }
          : product,
      );
    };

    return set(
      cartState,
      existedProduct
        ? updateCart(prevCart, currentProduct, type, quantity)
        : [...prevCart, { product: currentProduct, quantity }],
    );
  },
});

export const totalCartState = selector({
  key: 'totalCart',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.length
      ? cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
      : 0;
  },
});
